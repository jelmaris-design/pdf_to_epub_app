import React, { useState, useEffect } from 'react';
import { CheckCircle, Mail, Download, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const Result = ({ onBack, onSendToKindle, onDownload, savedEmail, isSending }) => {
    const [kindleEmail, setKindleEmail] = useState(savedEmail || '');
    const [showEmailInput, setShowEmailInput] = useState(!savedEmail);

    useEffect(() => {
        if (savedEmail) {
            setKindleEmail(savedEmail);
            setShowEmailInput(false);
        }
    }, [savedEmail]);

    const handleSendClick = () => {
        if (kindleEmail) {
            onSendToKindle(kindleEmail);
        } else {
            setShowEmailInput(true);
        }
    };

    return (
        <div className="flex flex-col h-full items-center justify-center gap-6 py-10">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4"
            >
                <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>

            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">Dönüştürme Tamamlandı!</h2>
                <p className="text-gray-500">EPUB dosyanız hazır.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full space-y-4 mt-4"
            >
                {showEmailInput && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mb-4"
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kindle Email Adresi</label>
                        <input
                            type="email"
                            value={kindleEmail}
                            onChange={(e) => setKindleEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                            placeholder="username@kindle.com"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Ayarlardan varsayılan email kaydedebilirsiniz
                        </p>
                    </motion.div>
                )}

                <Button onClick={handleSendClick} variant="primary" disabled={isSending}>
                    <Mail className="w-5 h-5" />
                    {isSending ? 'Gönderiliyor...' : (savedEmail ? `${savedEmail}'e Gönder` : 'Kindle\'a Gönder')}
                </Button>

                <Button onClick={onDownload} variant="secondary">
                    <Download className="w-5 h-5" />
                    EPUB İndir
                </Button>

                <Button onClick={onBack} variant="ghost" className="mt-4">
                    <ArrowLeft className="w-5 h-5" />
                    Başka Dönüştür
                </Button>
            </motion.div>
        </div>
    );
};

export default Result;
