import React, { useState, useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import Layout from './components/Layout';
import Home from './screens/Home';
import Editor from './screens/Editor';
import Result from './screens/Result';
import Settings from './screens/Settings';
import Premium from './screens/Premium';
import WhyUs from './screens/WhyUs';
import HowToUse from './screens/HowToUse';
import { generateEpub } from './utils/epubGenerator';
import { convertPdfToEpubAPI, isAPIConfigured } from './services/conversionService';
import { saveAs } from 'file-saver';
import { sendToKindleAPI } from './services/apiService';
import { extractPdfMetadata, extractPdfText } from './utils/pdfHelpers';
import {
  getUserTier,
  getTierLimits,
  canConvert,
  incrementConversionCount,
  getRemainingConversions,
  TIERS
} from './utils/userTier';

import KindleInstructionModal from './components/KindleInstructionModal';
import Onboarding from './screens/Onboarding';
import { useUser } from './context/UserContext';

function App() {
  const { user } = useUser();
  const [currentScreen, setCurrentScreen] = useState('home');
  const [pdfFile, setPdfFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [epubBlob, setEpubBlob] = useState(null);
  const [savedEmail, setSavedEmail] = useState('');
  const [userTier, setUserTierState] = useState(getUserTier());
  const [showAds, setShowAds] = useState(getTierLimits().showAds);
  const [isSending, setIsSending] = useState(false);
  const [showKindleModal, setShowKindleModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  useEffect(() => {
    const tier = getUserTier();
    setUserTierState(tier);
    setShowAds(getTierLimits(tier).showAds);

    // Handle Android Hardware Back Button
    const backButtonListener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (currentScreen === 'home') {
        CapacitorApp.exitApp();
      } else {
        setCurrentScreen('home');
      }
    });

    return () => {
      backButtonListener.then(handler => handler.remove());
    };
  }, [currentScreen]);

  if (!user.isOnboarded) {
    return <Onboarding />;
  }

  const handleFileSelect = async (file) => {
    try {
      if (!canConvert()) {
        alert('Monthly conversion limit reached! Upgrade to Premium for more.');
        setCurrentScreen('premium');
        return;
      }

      setPdfFile(file);
      // Show loading indicator or just transition
      const extracted = await extractPdfMetadata(file);
      setMetadata(extracted || { title: file.name.replace('.pdf', ''), author: 'Unknown' }); // Fallback if extraction fails
      setCurrentScreen('edit');
    } catch (error) {
      console.error("Error selecting file:", error);
      alert("Failed to read PDF file. Please try another one.");
      // Stay on home screen
    }
  };

  const handleConvertStart = async (data) => {
    setMetadata(data);
    setCurrentScreen('converting');

    const limits = getTierLimits();

    try {
      let blob;

      if (limits.apiConversion && isAPIConfigured()) {
        try {
          blob = await convertPdfToEpubAPI(pdfFile, data);
        } catch (apiError) {
          console.error('API conversion failed, falling back to client-side:', apiError);
          const textContent = await extractPdfText(pdfFile);
          blob = await generateEpub(data, textContent);
        }
      } else {
        const textContent = await extractPdfText(pdfFile);
        blob = await generateEpub(data, textContent);
      }

      setEpubBlob(blob);
      incrementConversionCount();
      setCurrentScreen('result');
    } catch (error) {
      console.error("Conversion failed:", error);
      alert("Conversion failed. Please try again.");
      setCurrentScreen('home');
    }
  };

  const handleSendToKindleClick = (email) => {
    const targetEmail = email || savedEmail;

    if (!epubBlob) {
      alert("No EPUB file found.");
      return;
    }

    if (!targetEmail) {
      alert("Please set your Kindle email in Settings.");
      setCurrentScreen('settings');
      return;
    }

    setPendingEmail(targetEmail);
    setShowKindleModal(true);
  };

  const handleConfirmSend = async () => {
    setShowKindleModal(false);
    setIsSending(true);
    const targetEmail = pendingEmail;

    try {
      // Call backend API to send email
      await sendToKindleAPI(epubBlob, metadata, targetEmail);

      alert(`✅ Success!\n\nEPUB sent to ${targetEmail}.\n\nIt should appear on your Kindle shortly.`);
      setIsSending(false);
    } catch (error) {
      console.error('Send to Kindle failed:', error);
      setIsSending(false);

      // Fallback to manual method
      if (confirm(`❌ Automatic send failed.\n\nError: ${error.message}\n\nDo you want to send manually?`)) {
        // Download file and open email
        const fileName = `${metadata.title || 'book'}.epub`;
        saveAs(epubBlob, fileName);

        setTimeout(() => {
          window.location.href = `mailto:${targetEmail}?subject=Convert&body=Please find the attached EPUB.`;
        }, 500);
      }
    }
  };

  const handleDownload = () => {
    if (epubBlob) {
      saveAs(epubBlob, `${metadata.title || 'book'}.epub`);
    }
  };

  const handleRemoveAds = () => {
    setCurrentScreen('premium');
  };

  const handlePurchase = (tier) => {
    setUserTierState(tier);
    setShowAds(getTierLimits(tier).showAds);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <Home
            onFileSelect={handleFileSelect}
            remainingConversions={getRemainingConversions()}
            userTier={userTier}
          />
        );
      case 'edit':
        return (
          <Editor
            file={pdfFile}
            onBack={() => setCurrentScreen('home')}
            onConvert={handleConvertStart}
          />
        );
      case 'converting':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Converting...</p>
          </div>
        );
      case 'result':
        return (
          <Result
            onBack={() => setCurrentScreen('home')}
            onSendToKindle={handleSendToKindleClick}
            onDownload={handleDownload}
            savedEmail={savedEmail}
            isSending={isSending}
          />
        );
      case 'settings':
        return (
          <Settings
            onBack={() => setCurrentScreen('home')}
            showAds={showAds}
            onRemoveAds={handleRemoveAds}
            savedEmail={savedEmail}
            onSaveEmail={setSavedEmail}
            userTier={userTier}
            onNavigatePremium={() => setCurrentScreen('premium')}
            onNavigateWhyUs={() => setCurrentScreen('whyus')}
            onNavigateHowTo={() => setCurrentScreen('howtouse')}
          />
        );
      case 'premium':
        return (
          <Premium
            onBack={() => setCurrentScreen('settings')}
            onPurchase={handlePurchase}
            userTier={userTier}
          />
        );
      case 'whyus':
        return (
          <WhyUs
            onBack={() => setCurrentScreen('settings')}
          />
        );
      case 'howtouse':
        return (
          <HowToUse
            onBack={() => setCurrentScreen('settings')}
          />
        );
      default:
        return (
          <Home
            onFileSelect={handleFileSelect}
            remainingConversions={getRemainingConversions()}
            userTier={userTier}
          />
        );
    }
  };

  return (
    <Layout
      showAds={showAds}
      onRemoveAds={handleRemoveAds}
      onOpenSettings={() => setCurrentScreen('settings')}
    >
      {renderScreen()}

      <KindleInstructionModal
        isOpen={showKindleModal}
        onClose={() => setShowKindleModal(false)}
        onConfirm={handleConfirmSend}
      />
    </Layout>
  );
}

export default App;
