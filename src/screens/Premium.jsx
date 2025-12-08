import React from 'react';
import { ArrowLeft, Check, Crown, Zap, Star, Sparkles, Infinity } from 'lucide-react';
import { motion } from 'framer-motion';
import { setUserTier, TIERS } from '../utils/userTier';
import { useTheme } from '../context/ThemeContext';

const Premium = ({ onBack, onPurchase }) => {
    const { theme } = useTheme();

    const handlePurchase = (tier, price) => {
        // Simulate purchase
        if (confirm(`Unlock ${tier === TIERS.LIFETIME ? 'Lifetime Access' : 'Premium Subscription'} for ${price}?`)) {
            setUserTier(tier);
            onPurchase(tier);
            alert('Welcome to the inner circle, Archmage! 🧙‍♂️✨');
            onBack();
        }
    };

    const Feature = ({ text }) => (
        <li className="flex items-center gap-3 text-sm">
            <div className="p-1 rounded-full bg-yellow-500/20">
                <Check size={12} className="text-yellow-500" />
            </div>
            <span className="opacity-90">{text}</span>
        </li>
    );

    return (
        <div className="flex flex-col h-full relative overflow-hidden">
            {/* Background Magic */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-yellow-500/10 to-transparent" />
                <motion.div
                    className="absolute top-20 right-10 w-32 h-32 rounded-full blur-3xl bg-yellow-500/20"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>

            {/* Header */}
            <div className="flex items-center gap-2 relative z-10 pb-4">
                <button
                    onClick={onBack}
                    className="p-2 rounded-full hover:bg-black/5 transition-colors"
                    style={{ color: theme.colors.text }}
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold font-serif" style={{ color: theme.colors.text }}>Unlock Magic</h2>
            </div>

            <div className="flex-1 overflow-y-auto pb-8 relative z-10 space-y-6">
                {/* Hero Section */}
                <div className="text-center space-y-2 py-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center shadow-lg mb-4">
                        <Crown size={40} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-serif font-bold" style={{ color: theme.colors.text }}>
                        Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">Grand Maester</span>
                    </h1>
                    <p className="opacity-70 max-w-xs mx-auto text-sm" style={{ color: theme.colors.subtext }}>
                        Unlock the full potential of your library with unlimited power.
                    </p>
                </div>

                {/* Plans */}
                <div className="grid gap-4 px-2">
                    {/* Monthly */}
                    <motion.div
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePurchase(TIERS.PREMIUM, '$2.99/mo')}
                        className="p-5 rounded-2xl border-2 relative overflow-hidden cursor-pointer hover:border-yellow-500/50 transition-colors"
                        style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.border, color: theme.colors.text }}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold font-serif text-lg">Apprentice</h3>
                            <span className="text-xl font-bold">$2.99<span className="text-xs font-normal opacity-60">/mo</span></span>
                        </div>
                        <ul className="space-y-2 opacity-80">
                            <Feature text="Unlimited Conversions" />
                            <Feature text="Remove All Ads" />
                        </ul>
                    </motion.div>

                    {/* Yearly */}
                    <motion.div
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePurchase(TIERS.PREMIUM, '$19.99/yr')}
                        className="p-5 rounded-2xl border-2 relative overflow-hidden cursor-pointer hover:border-yellow-500/50 transition-colors"
                        style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.border, color: theme.colors.text }}
                    >
                        <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                            SAVE 45%
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold font-serif text-lg">Scholar</h3>
                            <span className="text-xl font-bold">$19.99<span className="text-xs font-normal opacity-60">/yr</span></span>
                        </div>
                        <ul className="space-y-2 opacity-80">
                            <Feature text="Everything in Apprentice" />
                            <Feature text="Priority Support" />
                        </ul>
                    </motion.div>

                    {/* Lifetime - HERO */}
                    <motion.div
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePurchase(TIERS.LIFETIME, '$29.99')}
                        className="p-6 rounded-2xl border-2 relative overflow-hidden cursor-pointer shadow-xl"
                        style={{
                            background: `linear-gradient(135deg, ${theme.colors.card}, ${theme.colors.bg})`,
                            borderColor: '#eab308' // Yellow-500
                        }}
                    >
                        <div className="absolute inset-0 bg-yellow-500/5 pointer-events-none" />
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-sm">
                            BEST VALUE
                        </div>

                        <div className="flex items-center gap-2 mb-1 text-yellow-600">
                            <Infinity size={20} />
                            <span className="text-xs font-bold tracking-widest uppercase">Lifetime Access</span>
                        </div>

                        <div className="flex justify-between items-end mb-4">
                            <h3 className="font-bold font-serif text-2xl" style={{ color: theme.colors.text }}>Archmage</h3>
                            <div className="text-right">
                                <span className="text-sm line-through opacity-50 mr-2">$49.99</span>
                                <span className="text-3xl font-bold text-yellow-600">$29.99</span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <Feature text="One-time payment, yours forever" />
                            <Feature text="All future updates included" />
                            <Feature text="Exclusive 'Archmage' Badge" />
                            <Feature text="Support Independent Development ❤️" />
                        </div>

                        <button className="w-full py-3 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 transition-all active:scale-95 flex items-center justify-center gap-2">
                            <Sparkles size={18} />
                            Unlock Forever
                        </button>
                    </motion.div>
                </div>

                <p className="text-center text-xs opacity-50 px-6 pb-4" style={{ color: theme.colors.subtext }}>
                    Secure payment via Google Play. Cancel anytime.
                    <br />Restore Purchase
                </p>
            </div>
        </div>
    );
};

export default Premium;
