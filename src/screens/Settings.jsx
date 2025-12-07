import React, { useState } from 'react';
import { ArrowLeft, Save, Crown, HelpCircle, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { TIERS } from '../utils/userTier';

const Settings = ({ onBack, showAds, onRemoveAds, savedEmail, onSaveEmail, userTier, onNavigatePremium, onNavigateWhyUs }) => {
    const [email, setEmail] = useState(savedEmail || '');

    const handleSave = () => {
        onSaveEmail(email);
        onBack();
    };

    const getTierDisplay = () => {
        switch (userTier) {
            case TIERS.LIFETIME:
                return { name: 'Lifetime', color: 'text-teal-600 bg-teal-50', icon: Crown };
            case TIERS.PREMIUM:
                return { name: 'Premium', color: 'text-pink-600 bg-pink-50', icon: Crown };
            default:
                return { name: 'Ücretsiz', color: 'text-gray-600 bg-gray-50', icon: null };
        }
    };

    const tierDisplay = getTierDisplay();
    const TierIcon = tierDisplay.icon;

    return (
        <div className="flex flex-col h-full gap-6">
            <div className="flex items-center gap-2">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h2 className="text-xl font-bold text-gray-800">Ayarlar</h2>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* Tier Status */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-2">Mevcut Plan</h3>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${tierDisplay.color}`}>
                        {TierIcon && <TierIcon className="w-5 h-5" />}
                        <span className="font-medium">{tierDisplay.name}</span>
                    </div>
                    {userTier === TIERS.FREE && (
                        <button
                            onClick={onNavigatePremium}
                            className="mt-3 w-full flex items-center justify-between px-3 py-2 bg-gradient-to-r from-teal-400 to-primary text-teal-900 rounded-lg font-medium hover:shadow-md transition-all"
                        >
                            <span>Premium'a Geç</span>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Kindle Preferences */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-2">Kindle Tercihleri</h3>
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-600">Varsayılan Kindle Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                            placeholder="username@kindle.com"
                        />
                        <p className="text-xs text-gray-400">
                            Bu email dosya gönderirken otomatik doldurulacak.
                        </p>
                    </div>
                </div>

                {/* Why Us */}
                <button
                    onClick={onNavigateWhyUs}
                    className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <HelpCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-800">Neden Biz?</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
            </motion.div>

            <div className="mt-auto">
                <Button onClick={handleSave}>
                    <Save className="w-5 h-5" />
                    Ayarları Kaydet
                </Button>
            </div>
        </div>
    );
};

export default Settings;
