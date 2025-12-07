import React from 'react';
import { Upload, Book, Sparkles, Feather } from 'lucide-react';
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

    return (
        <div className="flex flex-col h-full py-6 gap-8">
            {/* Greeting */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <h1 className="text-4xl font-serif font-bold" style={{ color: theme.colors.text }}>
                    Good evening, {user.name || 'Traveler'}.
                </h1>
                <p className="italic font-serif text-lg" style={{ color: theme.colors.subtext }}>
                    The library is open for your contributions.
                </p>
            </motion.div>

            {/* Stats / Mana */}
            {isFree && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-lg border flex items-center justify-between"
                    style={{
                        backgroundColor: theme.colors.card,
                        borderColor: theme.colors.border,
                        color: theme.colors.text
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full" style={{ backgroundColor: `${theme.colors.accent}20` }}>
                            <Sparkles size={20} style={{ color: theme.colors.accent }} />
                        </div>
                        <div>
                            <p className="font-bold font-serif">Ink Remaining</p>
                            <p className="text-xs opacity-70">Daily Allowance</p>
                        </div>
                    </div>
                    <div className="text-2xl font-serif font-bold" style={{ color: theme.colors.accent }}>
                        {remainingConversions}/10
                    </div>
                </motion.div>
            )}

            {/* Main Action */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 flex flex-col justify-center"
            >
                <label className="block w-full group cursor-pointer">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <div
                        className="w-full aspect-[4/3] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all group-hover:scale-[1.02] group-hover:shadow-xl relative overflow-hidden"
                        style={{
                            borderColor: theme.colors.accent,
                            backgroundColor: `${theme.colors.accent}05`
                        }}
                    >
                        {/* Decorative corners */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 rounded-tl-xl opacity-50" style={{ borderColor: theme.colors.accent }} />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 rounded-br-xl opacity-50" style={{ borderColor: theme.colors.accent }} />

                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12"
                            style={{ backgroundColor: theme.colors.button }}
                        >
                            <Feather size={40} style={{ color: theme.colors.buttonText }} />
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-serif font-bold mb-1" style={{ color: theme.colors.text }}>Convert New Tome</h3>
                            <p className="text-sm" style={{ color: theme.colors.subtext }}>Select a PDF from your archives</p>
                        </div>
                    </div>
                </label>
            </motion.div>

            {/* Recent Shelf (Placeholder) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-4 border-t opacity-50"
                style={{ borderColor: theme.colors.border }}
            >
                <div className="flex items-center gap-2 mb-3" style={{ color: theme.colors.subtext }}>
                    <Book size={16} />
                    <span className="font-serif font-bold text-sm">Recent Additions</span>
                </div>
                <div
                    className="h-24 rounded-lg border border-dashed flex items-center justify-center text-sm italic"
                    style={{ borderColor: theme.colors.border, color: theme.colors.subtext }}
                >
                    Your shelf is waiting for new stories...
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
