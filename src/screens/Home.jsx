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
        <div className="flex flex-col h-screen overflow-hidden relative">
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

            {/* Magic Particles */}
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

            {/* Header Controls */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-50">
                {/* Quick Theme Switch (Top Left) */}
                <button
                    onClick={() => {
                        const themeKeys = Object.keys(themes);
                        const currentIndex = themeKeys.indexOf(theme.id);
                        const nextIndex = (currentIndex + 1) % themeKeys.length;
                        setTheme(themeKeys[nextIndex]);
                    }}
                    className="p-2 rounded-full bg-black/5 backdrop-blur-sm hover:bg-black/10 transition-colors"
                    style={{ color: theme.colors.text }}
                >
                    <Sparkles size={20} />
                </button>

                {/* Ink / Mana Status (Top Right) */}
                {isFree && (
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 backdrop-blur-sm border" style={{ borderColor: theme.colors.accent }}>
                            <Feather size={14} style={{ color: theme.colors.accent }} />
                            <span className="font-bold text-sm" style={{ color: theme.colors.text }}>{remainingConversions}/10</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content - Centered */}
            <div className="flex-1 flex flex-col justify-center items-center relative z-10 pb-20">
                {/* Greeting */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-2 opacity-60 text-xs font-serif uppercase tracking-widest mb-2" style={{ color: theme.colors.subtext }}>
                        <Star size={10} />
                        <span>The Grand Library</span>
                        <Star size={10} />
                    </div>
                    <h1 className="text-3xl font-serif font-bold leading-tight" style={{ color: theme.colors.text }}>
                        Welcome back,<br />
                        <span style={{ color: theme.colors.accent }}>{user.name || 'Traveler'}</span>.
                    </h1>
                </motion.div>

                {/* Main Action - Minimalist */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
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
                            className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-transform duration-500 group-hover:scale-110 relative overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, ${theme.colors.button}, ${theme.colors.accent})`,
                                color: theme.colors.buttonText
                            }}
                        >
                            <Plus size={40} strokeWidth={2} />
                        </motion.div>
                    </label>
                </motion.div>

                <p className="mt-6 text-base font-serif italic opacity-60" style={{ color: theme.colors.text }}>
                    Tap to convert
                </p>
            </div>
        </div>
    );
};

export default Home;
