import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, User, Palette, BookOpen, Crown, Trash2, LogOut, Instagram, Mail, Play, Heart, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { TIERS } from '../utils/userTier';
import { motion, AnimatePresence } from 'framer-motion';
import { App as CapacitorApp } from '@capacitor/app';

const Settings = ({ onBack, savedEmail, onSaveEmail, userTier, onNavigatePremium }) => {
    const { theme, setTheme, themes } = useTheme();
    const { user, updateUser, resetData } = useUser();

    const [email, setEmail] = useState(savedEmail || '');
    const [name, setName] = useState(user.name || '');
    const [showWhoAmI, setShowWhoAmI] = useState(false);

    const handleSaveEmail = (e) => {
        setEmail(e.target.value);
        onSaveEmail(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        updateUser({ name: e.target.value });
    };

    const handleLogOut = () => {
        CapacitorApp.exitApp();
    };

    const handleDeleteData = () => {
        if (confirm('Are you sure? This will delete ALL your data (stats, preferences, tier) and reset the app to the beginning.')) {
            resetData();
        }
    };

    const Section = ({ title, children }) => (
        <div className="mb-6">
            {title && <h3 className="text-xs font-bold uppercase tracking-wider mb-2 ml-4 opacity-60" style={{ color: theme.colors.subtext }}>{title}</h3>}
            <div className="rounded-xl overflow-hidden border divide-y" style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.border, divideColor: theme.colors.border }}>
                {children}
            </div>
        </div>
    );

    const Item = ({ icon: Icon, label, value, onClick, isDestructive, rightElement }) => (
        <div
            onClick={onClick}
            className={`flex items-center justify-between p-4 ${onClick ? 'cursor-pointer active:bg-black/5' : ''} transition-colors`}
        >
            <div className="flex items-center gap-3">
                {Icon && <Icon size={20} style={{ color: isDestructive ? '#ef4444' : theme.colors.accent }} />}
                <span className={`font-medium ${isDestructive ? 'text-red-500' : ''}`} style={{ color: isDestructive ? '#ef4444' : theme.colors.text }}>{label}</span>
            </div>
            <div className="flex items-center gap-2">
                {value && <span className="text-sm opacity-60" style={{ color: theme.colors.subtext }}>{value}</span>}
                {rightElement}
                {onClick && !rightElement && <ChevronRight size={16} className="opacity-40" style={{ color: theme.colors.text }} />}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full relative">
            {/* Header */}
            <div className="flex items-center gap-4 border-b pb-4 mb-6" style={{ borderColor: theme.colors.border }}>
                <button
                    onClick={onBack}
                    className="p-2 rounded-full hover:opacity-70 transition-colors"
                    style={{ color: theme.colors.text }}
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-serif font-bold" style={{ color: theme.colors.text }}>Settings</h2>
            </div>

            <div className="flex-1 overflow-y-auto pb-20">
                {/* Profile Section */}
                <Section title="Profile">
                    <div className="p-4 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center border-2" style={{ backgroundColor: `${theme.colors.accent}20`, borderColor: theme.colors.accent }}>
                            <User size={32} style={{ color: theme.colors.accent }} />
                        </div>
                        <div className="flex-1">
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                className="bg-transparent font-serif font-bold text-lg w-full focus:outline-none"
                                style={{ color: theme.colors.text }}
                                placeholder="Your Name"
                            />
                            <p className="text-sm opacity-60" style={{ color: theme.colors.subtext }}>
                                {userTier === TIERS.FREE ? 'Novice Traveler' : 'Master Librarian'}
                            </p>
                        </div>
                    </div>
                    <Item
                        icon={BookOpen}
                        label="My Tastes"
                        value={user.genres?.join(', ') || 'None selected'}
                    />
                </Section>

                {/* Library Settings */}
                <Section title="Library">
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <BookOpen size={20} style={{ color: theme.colors.accent }} />
                            <span className="font-medium" style={{ color: theme.colors.text }}>Kindle Email</span>
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={handleSaveEmail}
                            placeholder="username@kindle.com"
                            className="bg-transparent text-right text-sm focus:outline-none w-48"
                            style={{ color: theme.colors.subtext }}
                        />
                    </div>
                    <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <Palette size={20} style={{ color: theme.colors.accent }} />
                            <span className="font-medium" style={{ color: theme.colors.text }}>Atmosphere</span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                            {Object.values(themes).map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setTheme(t.id)}
                                    className={`w-8 h-8 rounded-full border-2 transition-transform ${theme.id === t.id ? 'scale-110 border-current' : 'border-transparent opacity-50'}`}
                                    style={{ backgroundColor: t.colors.bg, borderColor: theme.id === t.id ? theme.colors.accent : 'transparent' }}
                                />
                            ))}
                        </div>
                    </div>
                </Section>

                {/* Premium */}
                <Section title="Membership">
                    <Item
                        icon={Crown}
                        label="Grimoire Plans"
                        value={userTier === TIERS.FREE ? 'Free Tier' : 'Premium'}
                        onClick={onNavigatePremium}
                    />
                </Section>

                {/* About & Support */}
                <Section title="About">
                    <Item icon={User} label="Who am I?" onClick={() => setShowWhoAmI(true)} />
                    <Item icon={Instagram} label="Instagram" onClick={() => window.open('https://instagram.com', '_blank')} />
                    <Item icon={Play} label="TikTok" onClick={() => window.open('https://tiktok.com', '_blank')} />
                    <Item icon={Mail} label="Feedback" onClick={() => window.open('mailto:support@example.com', '_blank')} />
                </Section>

                {/* Danger Zone */}
                <Section title="Account">
                    <Item icon={LogOut} label="Log Out" onClick={handleLogOut} />
                    <Item icon={Trash2} label="Delete My Data" isDestructive onClick={handleDeleteData} />
                </Section>
            </div>

            {/* Who Am I Modal */}
            <AnimatePresence>
                {showWhoAmI && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowWhoAmI(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-sm rounded-2xl p-6 relative overflow-hidden"
                            style={{ backgroundColor: theme.colors.card, color: theme.colors.text }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowWhoAmI(false)}
                                className="absolute top-4 right-4 opacity-50 hover:opacity-100"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4" style={{ borderColor: theme.colors.accent }}>
                                    {/* Placeholder for user image or avatar */}
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Developer" className="w-full h-full object-cover" />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-serif font-bold">Hello, I'm [Name]!</h3>
                                    <p className="text-sm opacity-60 uppercase tracking-widest mt-1" style={{ color: theme.colors.accent }}>3D Artist & Developer</p>
                                </div>

                                <p className="text-sm leading-relaxed opacity-80">
                                    I'm a 23-year-old university graduate, 3D artist, and book lover just like you.
                                    I built this app because I wanted a more aesthetic way to bring my favorite stories to my Kindle.
                                    Thank you for being part of this journey! ✨
                                </p>

                                <div className="flex gap-4 pt-4">
                                    <button className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors">
                                        <Instagram size={20} />
                                    </button>
                                    <button className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors">
                                        <Play size={20} />
                                    </button>
                                    <button className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors">
                                        <Heart size={20} fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Settings;
