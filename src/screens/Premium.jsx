import React from 'react';
import { ArrowLeft, Check, Crown, Zap, Star } from 'lucide-react';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { setUserTier, TIERS } from '../utils/userTier';
import { useTheme } from '../context/ThemeContext';

const Premium = ({ onBack, onPurchase }) => {
    const { theme } = useTheme();

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
                <button
                    onClick={onBack}
                    className="p-2 rounded-full hover:bg-black/5 transition-colors"
                    style={{ color: theme.colors.text }}
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold font-serif">Grimoire Access</h2>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 overflow-y-auto space-y-4"
            >
                {/* Free Tier */}
                <div className="p-4 rounded-xl border-2" style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.border }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 opacity-50" />
                        <h3 className="font-bold text-lg font-serif">Novice</h3>
                    </div>
                    <p className="text-2xl font-bold mb-3 font-serif">$0</p>
                    <ul className="space-y-2 mb-4 opacity-80">
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 mt-0.5" style={{ color: theme.colors.accent }} />
                            <span>10 Conversions / Month</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 mt-0.5" style={{ color: theme.colors.accent }} />
                            <span>Basic Spells</span>
                        </li>
                    </ul>
                    <button className="w-full py-2 rounded-lg border opacity-50 cursor-not-allowed font-serif" style={{ borderColor: theme.colors.border }}>Current Rank</button>
                </div>

                {/* Lifetime Tier - RECOMMENDED */}
                <div className="p-4 rounded-xl border-2 relative overflow-hidden" style={{ backgroundColor: `${theme.colors.accent}10`, borderColor: theme.colors.accent }}>
                    <div className="absolute top-0 right-0 text-xs font-bold px-3 py-1 rounded-bl-xl" style={{ backgroundColor: theme.colors.accent, color: theme.colors.bg }}>
                        RECOMMENDED
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <Crown className="w-5 h-5" style={{ color: theme.colors.accent }} />
                        <h3 className="font-bold text-lg font-serif">Grand Maester</h3>
                    </div>
                    <p className="text-2xl font-bold mb-1 font-serif" style={{ color: theme.colors.accent }}>$14.99</p>
                    <p className="text-xs opacity-60 mb-3">One-time Offering</p>
                    <ul className="space-y-2 mb-4">
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 mt-0.5" style={{ color: theme.colors.accent }} />
                            <span className="font-bold">Unlimited Conversions</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 mt-0.5" style={{ color: theme.colors.accent }} />
                            <span>No Distractions (Ads)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 mt-0.5" style={{ color: theme.colors.accent }} />
                            <span>High Quality Alchemy</span>
                        </li>
                    </ul>
                    <button
                        onClick={() => handlePurchase(TIERS.LIFETIME)}
                        className="w-full py-3 rounded-lg font-bold font-serif shadow-lg transition-transform active:scale-95"
                        style={{ backgroundColor: theme.colors.accent, color: theme.colors.bg }}
                    >
                        Unlock Forever
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Premium;
