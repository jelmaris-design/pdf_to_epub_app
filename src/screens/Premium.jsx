import React from 'react';
import { ArrowLeft, Check, Crown, Zap, Star } from 'lucide-react';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { setUserTier, TIERS } from '../utils/userTier';

const Premium = ({ onBack, onPurchase }) => {
    const handlePurchase = (tier) => {
        // Simulate purchase
        if (confirm(`Satın almayı simüle et: ${tier === TIERS.LIFETIME ? 'Lifetime ($14.99)' : 'Premium ($3.99/ay)'}`)) {
            setUserTier(tier);
            onPurchase(tier);
            alert('Satın alma başarılı! (Simülasyon)');
            onBack();
        }
    };

    return (
        <div className="flex flex-col h-full gap-4 pb-4">
            <div className="flex items-center gap-2">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h2 className="text-xl font-bold text-gray-800">Go Premium</h2>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 overflow-y-auto space-y-4"
            >
                {/* Free Tier */}
                <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-gray-400" />
                        <h3 className="font-bold text-lg">Ücretsiz</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 mb-3">$0</p>
                    <ul className="space-y-2 mb-4">
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-500 mt-0.5" />
                            <span>Aylık 10 dönüştürme</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-500 mt-0.5" />
                            <span>Temel özellikler</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-400">
                            <span className="text-xs">⚠️</span>
                            <span>Her dönüştürmede reklam</span>
                        </li>
                    </ul>
                    <Button variant="ghost" disabled>Mevcut Plan</Button>
                </div>

                {/* Lifetime Tier - RECOMMENDED */}
                <div className="bg-gradient-to-br from-teal-50 to-primary/10 p-4 rounded-xl border-2 border-primary relative overflow-hidden">
                    <div className="absolute top-2 right-2 bg-primary text-teal-900 text-xs font-bold px-2 py-1 rounded-full">
                        ÖNERİLEN
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <Crown className="w-5 h-5 text-teal-600" />
                        <h3 className="font-bold text-lg">Lifetime</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 mb-1">$14.99</p>
                    <p className="text-xs text-gray-500 mb-3">Tek seferlik ödeme (≈ 500 TL)</p>
                    <ul className="space-y-2 mb-4">
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-teal-600 mt-0.5" />
                            <span className="font-medium">Sınırsız dönüştürme</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-teal-600 mt-0.5" />
                            <span className="font-medium">Reklamsız</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-teal-600 mt-0.5" />
                            <span className="font-medium">Yüksek kalite API dönüşüm</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-teal-600 mt-0.5" />
                            <span>Tüm özellikler</span>
                        </li>
                    </ul>
                    <Button onClick={() => handlePurchase(TIERS.LIFETIME)} variant="primary">
                        <Crown className="w-4 h-4" />
                        Lifetime Satın Al
                    </Button>
                </div>

                {/* Premium Tier */}
                <div className="bg-gradient-to-br from-pink-50 to-secondary/10 p-4 rounded-xl border-2 border-secondary">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-pink-600" />
                        <h3 className="font-bold text-lg">Premium</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 mb-1">$3.99<span className="text-sm text-gray-500">/ay</span></p>
                    <p className="text-xs text-gray-500 mb-3">Aylık abonelik (≈ 133 TL/ay)</p>
                    <ul className="space-y-2 mb-4">
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-pink-600 mt-0.5" />
                            <span className="font-medium">Sınırsız dönüştürme</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-pink-600 mt-0.5" />
                            <span className="font-medium">Reklamsız</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-pink-600 mt-0.5" />
                            <span className="font-medium">Yüksek kalite API dönüşüm</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-pink-600 mt-0.5" />
                            <span className="font-medium">Öncelikli destek</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-pink-600 mt-0.5" />
                            <span>Cloud yedekleme (yakında)</span>
                        </li>
                    </ul>
                    <Button onClick={() => handlePurchase(TIERS.PREMIUM)} variant="accent">
                        <Zap className="w-4 h-4" />
                        Premium'a Abone Ol
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default Premium;
