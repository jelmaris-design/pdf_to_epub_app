import React from 'react';
import { ArrowLeft, Check, Crown, Sparkles, Infinity, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { setUserTier, TIERS } from '../utils/userTier';
import { useTheme } from '../context/ThemeContext';

const Premium = ({ onBack, onPurchase }) => {
    const { theme } = useTheme();

    const handlePurchase = (tier, price) => {
        if (confirm(`Upgrade to ${tier === TIERS.LIFETIME ? 'Lifetime' : 'Subscription'} for ${price}?`)) {
            setUserTier(tier);
            onPurchase(tier);
            alert('Upgrade successful! ✨');
            onBack();
        }
    };

    return (
        <div className="flex flex-col h-full relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 p-4 pb-2">
                <button
                    onClick={onBack}
                    className="p-2 rounded-full hover:bg-black/5 transition-colors"
                    style={{ color: theme.colors.text }}
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold font-serif" style={{ color: theme.colors.text }}>Plans</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-4">

                {/* Monthly */}
                <div
                    onClick={() => handlePurchase(TIERS.PREMIUM, '$2.99/mo')}
                    className="p-4 rounded-xl border flex items-center justify-between cursor-pointer active:scale-98 transition-transform"
                    style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.border, color: theme.colors.text }}
                >
                    <div>
                        <h3 className="font-bold text-lg">Monthly</h3>
                        <p className="text-sm opacity-60">25 Books / Month</p>
                    </div>
                    <div className="text-right">
                        <span className="font-bold text-xl">$2.99</span>
                    </div>
                </div>

                {/* Yearly */}
                <div
                    onClick={() => handlePurchase(TIERS.PREMIUM, '$19.99/yr')}
                    className="p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer active:scale-98 transition-transform relative overflow-hidden"
                    style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.accent, color: theme.colors.text }}
                >
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                        SAVE 45%
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Yearly</h3>
                        <p className="text-sm opacity-60">Unlimited Books</p>
                    </div>
                    <div className="text-right">
                        <span className="font-bold text-xl">$19.99</span>
                    </div>
                </div>

                {/* Lifetime */}
                <div
                    onClick={() => handlePurchase(TIERS.LIFETIME, '$29.99')}
                    className="p-6 rounded-xl border-2 cursor-pointer active:scale-98 transition-transform shadow-lg"
                    style={{
                        background: `linear-gradient(135deg, ${theme.colors.card}, ${theme.colors.bg})`,
                        borderColor: '#eab308' // Yellow-500
                    }}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1 text-yellow-600">
                                <Crown size={20} />
                                <span className="font-bold uppercase tracking-wider text-sm">Lifetime</span>
                            </div>
                            <h3 className="font-bold text-2xl" style={{ color: theme.colors.text }}>Archmage</h3>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-bold text-yellow-600">$29.99</span>
                            <p className="text-xs line-through opacity-50">$49.99</p>
                        </div>
                    </div>

                    <ul className="space-y-2 mb-6 opacity-80 text-sm" style={{ color: theme.colors.text }}>
                        <li className="flex items-center gap-2">
                            <Check size={16} className="text-yellow-500" />
                            <span>One-time payment</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check size={16} className="text-yellow-500" />
                            <span>Unlimited Conversions Forever</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check size={16} className="text-yellow-500" />
                            <span>First Year Special Offer</span>
                        </li>
                    </ul>

                    <button className="w-full py-3 rounded-lg font-bold text-white shadow-md bg-gradient-to-r from-yellow-500 to-orange-600">
                        Get Lifetime Access
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Premium;
