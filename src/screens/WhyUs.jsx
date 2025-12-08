import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Smartphone, Zap, Shield, Heart, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const WhyUs = ({ onBack }) => {
    const { theme } = useTheme();
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    }, []);

    const reasons = [
        {
            icon: Smartphone,
            title: 'Mobile Freedom',
            description: 'No PC needed! Convert instantly from your phone, read anywhere.',
            color: 'text-teal-600 bg-teal-50'
        },
        {
            icon: Zap,
            title: 'Fast & Simple',
            description: 'No complex settings. Your PDF becomes an EPUB in 3 taps.',
            color: 'text-yellow-600 bg-yellow-50'
        },
        {
            icon: Shield,
            title: 'Privacy First',
            description: 'Your files stay on your device. We respect your sanctuary.',
            color: 'text-blue-600 bg-blue-50'
        },
        {
            icon: Heart,
            title: 'Kindle Integration',
            description: 'Send directly to your Kindle. No more email hassle!',
            color: 'text-pink-600 bg-pink-50'
        },
        {
            icon: Sparkles,
            title: 'Professional Quality',
            description: 'API-powered alchemy for the highest quality EPUBs.',
            color: 'text-purple-600 bg-purple-50'
        },
        {
            icon: TrendingUp,
            title: 'Ever Evolving',
            description: 'Regular updates and new spells added constantly.',
            color: 'text-green-600 bg-green-50'
        }
    ];

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex items-center gap-2 pb-4 border-b" style={{ borderColor: theme.colors.border }}>
                <button
                    onClick={onBack}
                    className="p-2 rounded-full hover:opacity-70 transition-colors"
                    style={{ color: theme.colors.text }}
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold font-serif" style={{ color: theme.colors.text }}>Why Grimoire?</h2>
            </div>

            <motion.div
                ref={containerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 overflow-y-auto space-y-3 pb-4"
            >
                <p className="text-sm mb-4 opacity-80" style={{ color: theme.colors.subtext }}>
                    Why choose our mobile grimoire over desktop spells?
                </p>

                {reasons.map((reason, index) => {
                    const Icon = reason.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-xl shadow-sm border"
                            style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.border }}
                        >
                            <div className="flex gap-3">
                                <div className={`p-3 rounded-lg shrink-0 ${reason.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1" style={{ color: theme.colors.text }}>{reason.title}</h3>
                                    <p className="text-sm opacity-70" style={{ color: theme.colors.subtext }}>{reason.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                <div className="p-4 rounded-xl mt-6 border-2 border-dashed" style={{ borderColor: theme.colors.accent, backgroundColor: `${theme.colors.accent}10` }}>
                    <h3 className="font-bold mb-2" style={{ color: theme.colors.text }}>💡 Bonus</h3>
                    <p className="text-sm opacity-80" style={{ color: theme.colors.subtext }}>
                        Start with the Free Tier, upgrade if you love it.
                        No obligations, just pure magic!
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default WhyUs;
