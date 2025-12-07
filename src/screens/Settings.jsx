import React, { useState } from 'react';
import { ArrowLeft, Save, Crown, User, Palette, BookOpen } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { TIERS } from '../utils/userTier';
import { motion } from 'framer-motion';

const Settings = ({ onBack, savedEmail, onSaveEmail, userTier, onNavigatePremium }) => {
    const { theme, setTheme, themes } = useTheme();
    const { user, updateUser } = useUser();

    const [email, setEmail] = useState(savedEmail || '');
    const [name, setName] = useState(user.name || '');
    const [isEditingName, setIsEditingName] = useState(false);

    const handleSave = () => {
        onSaveEmail(email);
        updateUser({ name });
        onBack();
    };

    const getTierDisplay = () => {
        switch (userTier) {
            case TIERS.LIFETIME:
                return { name: 'Grand Maester', color: theme.colors.accent };
            case TIERS.PREMIUM:
                return { name: 'Scholar', color: theme.colors.accent };
            default:
                return { name: 'Novice', color: theme.colors.subtext };
        }
    };

    const tierDisplay = getTierDisplay();

    return (
        <div className="flex flex-col h-full gap-6 pb-20">
            {/* Header */}
            <div className="flex items-center gap-4 border-b pb-4" style={{ borderColor: theme.colors.border }}>
                <button
                    onClick={onBack}
                    className="p-2 rounded-full hover:opacity-70 transition-colors"
                    style={{ color: theme.colors.text }}
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-serif font-bold" style={{ color: theme.colors.text }}>Library Settings</h2>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* Profile Section */}
                <div className="p-4 rounded-xl border flex items-center gap-4" style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.border }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center border-2" style={{ backgroundColor: `${theme.colors.accent}20`, borderColor: theme.colors.accent }}>
                        <User size={32} style={{ color: theme.colors.accent }} />
                    </div>
                    <div className="flex-1">
                        {isEditingName ? (
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => setIsEditingName(false)}
                                autoFocus
                                className="bg-transparent border-b border-current font-serif font-bold text-lg w-full focus:outline-none"
                                style={{ color: theme.colors.text }}
                            />
                        ) : (
                            <h3
                                onClick={() => setIsEditingName(true)}
                                className="font-serif font-bold text-lg cursor-pointer hover:opacity-70"
                                style={{ color: theme.colors.text }}
                            >
                                {name || 'Unknown Traveler'}
                            </h3>
                        )}
                        <div className="flex items-center gap-2 text-sm opacity-70">
                            <Crown size={14} style={{ color: tierDisplay.color }} />
                            <span style={{ color: tierDisplay.color }}>{tierDisplay.name}</span>
                        </div>
                    </div>
                </div>

                {/* Theme Selector */}
                <div className="space-y-3">
                    <h3 className="font-serif font-bold flex items-center gap-2" style={{ color: theme.colors.text }}>
                        <Palette size={18} /> Atmosphere
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                        {Object.values(themes).map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id)}
                                className={`p-2 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${theme.id === t.id ? 'scale-105 shadow-md' : 'opacity-70 hover:opacity-100'
                                    }`}
                                style={{
                                    backgroundColor: t.colors.bg,
                                    borderColor: theme.id === t.id ? theme.colors.accent : 'transparent',
                                    color: t.colors.text
                                }}
                            >
                                <div className="w-full h-8 rounded opacity-50" style={{ backgroundColor: t.colors.accent }} />
                                <span className="text-xs font-bold">{t.name.split(' ')[0]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Kindle Email */}
                <div className="space-y-3">
                    <h3 className="font-serif font-bold flex items-center gap-2" style={{ color: theme.colors.text }}>
                        <BookOpen size={18} /> Kindle Owl
                    </h3>
                    <div className="p-4 rounded-xl border" style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.border }}>
                        <label className="block text-xs opacity-70 mb-1" style={{ color: theme.colors.subtext }}>Destination Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border-b py-2 focus:outline-none font-mono text-sm"
                            style={{ color: theme.colors.text, borderColor: theme.colors.subtext }}
                            placeholder="username@kindle.com"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border text-center" style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.border }}>
                        <p className="text-2xl font-serif font-bold" style={{ color: theme.colors.accent }}>
                            {user.stats?.booksConverted || 0}
                        </p>
                        <p className="text-xs opacity-70" style={{ color: theme.colors.subtext }}>Tomes Converted</p>
                    </div>
                    <div className="p-4 rounded-xl border text-center" style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.border }}>
                        <p className="text-2xl font-serif font-bold" style={{ color: theme.colors.accent }}>
                            {user.stats?.pagesRead || 0}
                        </p>
                        <p className="text-xs opacity-70" style={{ color: theme.colors.subtext }}>Pages Turned</p>
                    </div>
                </div>

                {/* Version */}
                <div className="text-center opacity-40 text-xs pt-4 font-mono" style={{ color: theme.colors.subtext }}>
                    v2.1.0 (Enchanted)
                </div>

                {/* Premium Plans Access */}
                <div className="pt-2">
                    <button
                        onClick={onNavigatePremium}
                        className="w-full p-3 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all hover:scale-105"
                        style={{
                            borderColor: theme.colors.accent,
                            color: theme.colors.accent,
                            backgroundColor: `${theme.colors.accent}10`
                        }}
                    >
                        <Crown size={18} />
                        View Grimoire Plans
                    </button>
                </div>
            </motion.div>

            <div className="fixed bottom-6 left-0 right-0 px-6">
                <button
                    onClick={handleSave}
                    className="w-full py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                    style={{ backgroundColor: theme.colors.button, color: theme.colors.buttonText }}
                >
                    <Save size={20} />
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Settings;
