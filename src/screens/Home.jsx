import React from 'react';
import { Plus, Sparkles } from 'lucide-react';
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
            alert('Please select a valid PDF file.');
        }
    };

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
        <div className="flex flex-col h-full relative overflow-hidden">
            {/* Full Screen Flowing Magic Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            backgroundColor: theme.colors.accent,
                            top: -20,
                            left: `${Math.random() * 100}%`,
                            opacity: 0.6
                        }}
                        animate={{
                            y: ['0vh', '100vh'],
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    />
                ))}
                {/* Larger Sparkles */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`sparkle-${i}`}
                        className="absolute"
                        style={{
                            top: -20,
                            left: `${Math.random() * 100}%`,
                            color: theme.colors.accent
                        }}
                        animate={{
                            y: ['0vh', '100vh'],
                            opacity: [0, 0.8, 0],
                            rotate: [0, 180, 360]
                        }}
                        transition={{
                            duration: 8 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    >
                        <Sparkles size={12} />
                    </motion.div>
                ))}
            </div>

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
            </div>

            {/* Main Content - Centered */}
            <div className="flex-1 flex flex-col justify-center items-center relative z-10 pb-10">
                {/* Greeting */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl font-serif font-bold leading-tight" style={{ color: theme.colors.text }}>
                        Welcome back,<br />
                        <span style={{ color: theme.colors.accent }}>{user.name || 'Traveler'}</span>.
                    </h1>
                    {userTier === TIERS.FREE && (
                        <p className="text-sm mt-2 opacity-60" style={{ color: theme.colors.subtext }}>
                            {remainingConversions} conversions remaining
                        </p>
                    )}
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
                            className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-transform duration-500 group-hover:scale-110 relative overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, ${theme.colors.button}, ${theme.colors.accent})`,
                                color: theme.colors.buttonText
                            }}
                        >
                            <Plus size={48} strokeWidth={2} />
                        </motion.div>
                    </label>
                </motion.div>

                <p className="mt-6 text-lg font-serif italic opacity-60" style={{ color: theme.colors.text }}>
                    Tap to convert
                </p>
            </div>
        </div>
    );
};

export default Home;
