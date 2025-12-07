import React from 'react';
import { Upload, Book, Sparkles, Feather, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { TIERS } from '../utils/userTier';

const Home = ({ onFileSelect, remainingConversions, userTier }) => {
    const { user } = useUser();
    const { theme } = useTheme();

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

    const glow = {
        animate: {
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
            transition: {
                duration: 3,
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

            {/* Greeting */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2 relative z-10"
            >
                <div className="flex items-center gap-2 opacity-60 text-sm font-serif uppercase tracking-widest" style={{ color: theme.colors.subtext }}>
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
                    className="relative z-10"
                >
                    <div
                        className="p-5 rounded-2xl border backdrop-blur-sm flex items-center justify-between shadow-lg"
                        style={{
                            backgroundColor: `${theme.colors.card}80`, // Semi-transparent
                            borderColor: theme.colors.border,
                            color: theme.colors.text
                        }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                {/* Ink Bottle Visual */}
                                <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center overflow-hidden" style={{ borderColor: theme.colors.accent, backgroundColor: `${theme.colors.bg}` }}>
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 w-full"
                                        style={{ backgroundColor: theme.colors.accent }}
                                        initial={{ height: '0%' }}
                                        animate={{ height: `${(remainingConversions / 10) * 100}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                    <Sparkles size={20} className="relative z-10" style={{ color: remainingConversions > 0 ? theme.colors.bg : theme.colors.subtext }} />
                                </div>
                                <motion.div
                                    className="absolute -top-1 -right-1"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                >
                                    <Star size={12} fill={theme.colors.accent} stroke="none" />
                                </motion.div>
                            </div>
                            <div>
                                <p className="font-bold font-serif text-lg">Mystic Ink</p>
                                <p className="text-xs opacity-70">Daily Essence Remaining</p>
                            </div>
                        </div>
                        <div className="text-3xl font-serif font-bold" style={{ color: theme.colors.accent }}>
                            {remainingConversions}<span className="text-sm opacity-50 ml-1">/10</span>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Main Action - Grimoire Style */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 flex flex-col justify-center relative z-10"
            >
                <label className="block w-full group cursor-pointer relative">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* Glow Effect behind the card */}
                    <motion.div
                        variants={glow}
                        animate="animate"
                        className="absolute inset-0 rounded-2xl blur-xl opacity-20 -z-10"
                        style={{ backgroundColor: theme.colors.accent }}
                    />

                    <motion.div
                        variants={float}
                        animate="animate"
                        className="w-full aspect-[4/3] rounded-2xl border-2 flex flex-col items-center justify-center gap-6 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl relative overflow-hidden bg-opacity-80 backdrop-blur-md"
                        style={{
                            borderColor: theme.colors.accent,
                            backgroundColor: theme.colors.card
                        }}
                    >
                        {/* Ornate Border Corners */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 opacity-40" style={{ borderColor: theme.colors.accent }} />
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 opacity-40" style={{ borderColor: theme.colors.accent }} />
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 opacity-40" style={{ borderColor: theme.colors.accent }} />
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 opacity-40" style={{ borderColor: theme.colors.accent }} />

                        <div
                            className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                            style={{
                                background: `linear-gradient(135deg, ${theme.colors.button}, ${theme.colors.accent})`,
                                color: theme.colors.buttonText
                            }}
                        >
                            <Feather size={48} strokeWidth={1.5} />
                        </div>

                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-serif font-bold" style={{ color: theme.colors.text }}>
                                Transmute Tome
                            </h3>
                            <p className="text-sm px-8 opacity-70" style={{ color: theme.colors.subtext }}>
                                Select a PDF scroll to begin the enchantment
                            </p>
                        </div>

                        {/* Button-like visual at bottom */}
                        <div
                            className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0"
                            style={{ backgroundColor: `${theme.colors.accent}20`, color: theme.colors.accent }}
                        >
                            Begin Ritual
                        </div>
                    </motion.div>
                </label>
            </motion.div>

            {/* Recent Shelf */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-4 border-t opacity-60 relative z-10"
                style={{ borderColor: theme.colors.border }}
            >
                <div className="flex items-center gap-2 mb-3" style={{ color: theme.colors.subtext }}>
                    <Book size={16} />
                    <span className="font-serif font-bold text-sm">Recent Transmutations</span>
                </div>
                <div
                    className="h-20 rounded-lg border border-dashed flex items-center justify-center text-sm italic hover:bg-black/5 transition-colors cursor-default"
                    style={{ borderColor: theme.colors.border, color: theme.colors.subtext }}
                >
                    The archives are silent...
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
