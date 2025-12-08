import React from 'react';
import { Upload, Book, Sparkles, Feather, Star, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { TIERS } from '../utils/userTier';

const Home = ({ onFileSelect, remainingConversions, userTier }) => {
    const { user } = useUser();
    const { theme, setTheme, themes } = useTheme();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            onFileSelect(file);
        } else {
            alert('Please select a valid PDF tome.');
        }
    };

    const isFree = userTier === TIERS.FREE;

    // Floating animation variants
    const float = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="flex flex-col h-full py-6 gap-8 relative overflow-hidden">
            {/* Background Ambient Glows */}
            <motion.div
                className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ backgroundColor: theme.colors.accent }}
                animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ backgroundColor: theme.colors.accent }}
                animate={{ x: [0, -30, 0], y: [0, -50, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
            />

            {/* Magic Particles (Brighter) */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full pointer-events-none"
                    style={{ backgroundColor: theme.colors.accent, top: -10, left: `${Math.random() * 100}%` }}
                    animate={{
                        y: ['0vh', '100vh'],
                        opacity: [0, 1, 0],
                        scale: [0, 2, 0]
                    }}
                    transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                />
            ))}

            {/* Quick Theme Switch (Top Left) */}
            <button
                onClick={() => {
                    const themeKeys = Object.keys(themes);
                    const currentIndex = themeKeys.indexOf(theme.id);
                    const nextIndex = (currentIndex + 1) % themeKeys.length;
                    setTheme(themeKeys[nextIndex]);
                }}
                className="absolute top-4 left-4 p-2 rounded-full bg-black/5 backdrop-blur-sm z-50 hover:bg-black/10 transition-colors"
                style={{ color: theme.colors.text }}
            >
                <Sparkles size={20} />
            </button>

            {/* Greeting */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2 relative z-10 text-center mt-12"
            >
                <div className="flex items-center justify-center gap-2 opacity-60 text-sm font-serif uppercase tracking-widest" style={{ color: theme.colors.subtext }}>
                    <Star size={12} />
                    <span>The Grand Library</span>
                    <Star size={12} />
                </div>
                <h1 className="text-4xl font-serif font-bold leading-tight" style={{ color: theme.colors.text }}>
                    Welcome back,<br />
                    <span style={{ color: theme.colors.accent }}>{user.name || 'Traveler'}</span>.
                </h1>
            </motion.div>

            {/* Ink / Mana Status */}
            {isFree && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative z-10 flex justify-center"
                >
                    <div className="flex flex-col items-center gap-2">
                        {/* Ink Bottle Visual */}
                        <div className="w-16 h-16 rounded-full border-2 flex items-end justify-center overflow-hidden relative bg-black/5" style={{ borderColor: theme.colors.accent }}>
                            <motion.div
                                className="w-full absolute bottom-0"
                                style={{ backgroundColor: theme.colors.accent }}
                                initial={{ height: '0%' }}
                                animate={{ height: `${(remainingConversions / 10) * 100}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                            <Sparkles size={24} className="relative z-10 mb-4" style={{ color: remainingConversions > 5 ? theme.colors.bg : theme.colors.subtext }} />
                        </div>
                        <div className="text-center">
                            <p className="font-bold font-serif text-lg" style={{ color: theme.colors.text }}>Mystic Ink</p>
                            <p className="text-sm opacity-70" style={{ color: theme.colors.subtext }}>{remainingConversions}/10 Drops Remaining</p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Main Action - Minimalist */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 flex flex-col justify-center items-center relative z-10"
            >
                <label className="block group cursor-pointer relative">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <motion.div
                        variants={float}
                        animate="animate"
                        className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-transform duration-500 group-hover:scale-110 relative overflow-hidden"
                        style={{
                            background: `linear-gradient(135deg, ${theme.colors.button}, ${theme.colors.accent})`,
                            color: theme.colors.buttonText
                        }}
                    >
                        <Plus size={48} strokeWidth={2} />
                    </motion.div>
                </label>
                <p className="mt-6 text-lg font-serif italic opacity-80" style={{ color: theme.colors.text }}>
                    "Transmute a new tome..."
                </p>
            </motion.div>
        </div>
    );
};

export default Home;
