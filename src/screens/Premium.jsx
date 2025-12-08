import React from 'react';
import { ArrowLeft, Check, Crown, Sparkles, Infinity, Star, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { setUserTier, TIERS } from '../utils/userTier';
import { useTheme } from '../context/ThemeContext';

const Premium = ({ onBack, onPurchase }) => {
    const { theme } = useTheme();

    const handlePurchase = (tier, price) => {
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
        <div className="flex flex-col h-full relative overflow-hidden bg-gradient-to-b from-black/5 to-transparent">
            {/* Smoother, Magical Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-[100px] opacity-20"
                    style={{ backgroundColor: theme.colors.accent }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-1/3 -right-20 w-80 h-80 rounded-full blur-[80px] opacity-10"
                    style={{ backgroundColor: '#fbbf24' }} // Amber/Gold
                    animate={{ y: [0, 50, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                {/* Sparkles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-yellow-400"
                        style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                        transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
                    />
                ))}
            </div>

            {/* Header */}
            <div className="flex items-center gap-2 relative z-10 p-4 pt-6">
                <button
                    onClick={onBack}
                    className="p-2 rounded-full hover:bg-black/5 transition-colors"
                    style={{ color: theme.colors.text }}
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                {/* No Settings Icon here as requested */}
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-8 relative z-10 space-y-6">
                {/* Hero Section */}
                <div className="text-center space-y-2 py-2">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center shadow-xl mb-4 relative"
                    >
                        <Crown size={48} className="text-white drop-shadow-md" />
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-white/30"
                            animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>
                    <h1 className="text-3xl font-serif font-bold" style={{ color: theme.colors.text }}>
                        Unlock Your Potential
                    </h1>
                    <p className="opacity-70 max-w-xs mx-auto text-sm leading-relaxed" style={{ color: theme.colors.subtext }}>
                        Choose your path and ascend to mastery.
                    </p>
                </div>

                {/* Plans */}
                <div className="grid gap-4">
                    {/* Monthly */}
                    <motion.div
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePurchase(TIERS.PREMIUM, '$2.99/mo')}
                        className="p-5 rounded-2xl border relative overflow-hidden cursor-pointer transition-all hover:shadow-md"
                        style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.border, color: theme.colors.text }}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold font-serif text-lg flex items-center gap-2">
                                    <Shield size={18} className="text-blue-500" />
                                    Apprentice
                                </h3>
                                <span className="text-xs opacity-60">Monthly Subscription</span>
                            </div>
                            <span className="text-xl font-bold">$2.99<span className="text-xs font-normal opacity-60">/mo</span></span>
                        </div>
                        <ul className="space-y-2 opacity-80">
                            <Feature text="25 Conversions / Month" />
                            <Feature text="Remove All Ads" />
                            <Feature text="'Apprentice' Badge" />
                        </ul>
                    </motion.div>

                    {/* Yearly */}
                    <motion.div
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePurchase(TIERS.PREMIUM, '$19.99/yr')}
                        className="p-5 rounded-2xl border-2 relative overflow-hidden cursor-pointer transition-all hover:shadow-lg"
                        style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.accent, color: theme.colors.text }}
                    >
                        <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                            UNLIMITED
                        </div>
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold font-serif text-lg flex items-center gap-2">
                                    <Zap size={18} className="text-yellow-500" />
                                    Scholar
                                </h3>
                                <span className="text-xs opacity-60">Yearly Subscription</span>
                            </div>
                            <span className="text-xl font-bold">$19.99<span className="text-xs font-normal opacity-60">/yr</span></span>
                        </div>
                        <ul className="space-y-2 opacity-80">
                            <Feature text="Unlimited Conversions" />
                            <Feature text="Priority Processing" />
                            <Feature text="'Scholar' Badge" />
                        </ul>
                    </motion.div>

                    {/* Lifetime */}
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
                            SPECIAL OFFER
                        </div>

                        <div className="flex items-center gap-2 mb-1 text-yellow-600">
                            <Infinity size={20} />
                            <span className="text-xs font-bold tracking-widest uppercase">Lifetime Access</span>
                        </div>

                        <div className="flex justify-between items-end mb-4">
                            <h3 className="font-bold font-serif text-2xl flex items-center gap-2" style={{ color: theme.colors.text }}>
                                <Crown size={24} className="text-yellow-500" />
                                Archmage
                            </h3>
                            <div className="text-right">
                                <span className="text-3xl font-bold text-yellow-600">$29.99</span>
                            </div>
                        </div>

                        <p className="text-xs font-bold text-orange-500 mb-4 uppercase tracking-wider">
                            ✨ First Year Special ✨
                        </p>

                        <div className="space-y-3 mb-6">
                            <Feature text="One-time payment, yours forever" />
                            <Feature text="Unlimited Everything" />
                            <Feature text="Exclusive 'Archmage' Badge" />
                        </div>

                        <button className="w-full py-3 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 transition-all active:scale-95 flex items-center justify-center gap-2">
                            <Sparkles size={18} />
                            Claim Destiny
                        </button>
                    </motion.div>
                </div>

                <p className="text-center text-xs opacity-50 px-6 pb-4" style={{ color: theme.colors.subtext }}>
                    Free Plan includes 10 conversions/month.
                    <br />Watch ads to earn daily mana.
                </p>
            </div>
        </div>
    );
};

export default Premium;
