import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './screens/Home';
import Editor from './screens/Editor';
import Result from './screens/Result';
import Settings from './screens/Settings';
import Premium from './screens/Premium';
import WhyUs from './screens/WhyUs';
import { extractPdfMetadata, extractPdfText } from './utils/pdfHelpers';
import { generateEpub } from './utils/epubGenerator';
import { convertPdfToEpubAPI, isAPIConfigured } from './services/conversionService';
import { saveAs } from 'file-saver';
import { sendToKindleAPI } from './services/apiService';
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
  }, []);

  if (!user.isOnboarded) {
    return <Onboarding />;
  }

  const handleFileSelect = async (file) => {
    if (!canConvert()) {
      alert('Aylık dönüştürme limitiniz doldu! Premium\'a geçerek sınırsız dönüştürme yapabilirsiniz.');
      setCurrentScreen('premium');
      return;
    }

    setPdfFile(file);
    const extracted = await extractPdfMetadata(file);
    setCurrentScreen('edit');
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
      alert("Dönüştürme başarısız. Lütfen tekrar deneyin.");
      setCurrentScreen('home');
    }
  };

  const handleSendToKindleClick = (email) => {
    const targetEmail = email || savedEmail;

    if (!epubBlob) {
      alert("EPUB dosyası bulunamadı. Lütfen önce dönüştürme yapın.");
      return;
    }

    if (!targetEmail) {
      alert("Lütfen Kindle email adresinizi ayarlardan ekleyin.");
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

      alert(`✅ Başarılı!\n\nEPUB dosyası ${targetEmail} adresine gönderildi.\n\nBirkaç dakika içinde Kindle'ınızda görünecektir.`);
      setIsSending(false);
    } catch (error) {
      console.error('Send to Kindle failed:', error);
      setIsSending(false);

      // Fallback to manual method
      if (confirm(`❌ Otomatik gönderim başarısız oldu.\n\nHata: ${error.message}\n\nManuel olarak göndermek ister misiniz?`)) {
        // Download file and open email
        const fileName = `${metadata.title || 'book'}.epub`;
        saveAs(epubBlob, fileName);

        setTimeout(() => {
          window.location.href = `mailto:${targetEmail}?subject=Convert&body=Lütfen indirilen EPUB dosyasını ekleyin.`;
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
            <p className="text-gray-500 font-medium">Dönüştürülüyor...</p>
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
          />
        );
      case 'premium':
        return (
          <Premium
            onBack={() => setCurrentScreen('home')}
            onPurchase={handlePurchase}
          />
        );
      case 'whyus':
        return (
          <WhyUs
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
