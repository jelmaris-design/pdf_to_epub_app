import React from 'react';
import { Upload, FileText, Crown } from 'lucide-react';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { TIERS } from '../utils/userTier';

const Home = ({ onFileSelect, remainingConversions, userTier }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            onFileSelect(file);
        } else {
            alert('Lütfen geçerli bir PDF dosyası seçin.');
        }
    };

    const isFree = userTier === TIERS.FREE;

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8 py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-2"
            >
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-10 h-10 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">PDF'i EPUB'a Çevir</h2>
                <p className="text-gray-500 max-w-[250px] mx-auto">
                    Belgelerinizi Kindle veya e-okuyucunuz için e-kitaba dönüştürün.
                </p>
            </motion.div>

            {isFree && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-teal-50 to-pink-50 px-4 py-2 rounded-lg"
                >
                    <p className="text-sm text-center">
                        <span className="font-bold text-teal-700">{remainingConversions}</span>
                        <span className="text-gray-600"> / 10 ücretsiz dönüştürme kaldı</span>
                    </p>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full"
            >
                <label className="block w-full">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <div className="w-full py-4 px-6 rounded-xl font-semibold shadow-md transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-primary text-teal-900 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                        <Upload className="w-5 h-5" />
                        PDF Dosyası Seç
                    </div>
                </label>
                <p className="text-xs text-center text-gray-400 mt-3">
                    Standart PDF dosyalarını destekler (max 50MB)
                </p>
            </motion.div>
        </div>
    );
};

export default Home;
