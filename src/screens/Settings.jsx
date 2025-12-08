import React, { useState, useRef } from 'react';
import { ArrowLeft, ChevronRight, User, BookOpen, Crown, Trash2, LogOut, Instagram, Mail, Play, Heart, X, HelpCircle, Share2, Camera, Save, CheckCircle, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { TIERS } from '../utils/userTier';
import { motion, AnimatePresence } from 'framer-motion';
import { App as CapacitorApp } from '@capacitor/app';
import { Share } from '@capacitor/share';

const Settings = ({ onBack, savedEmail, onSaveEmail, userTier, onNavigatePremium, onNavigateWhyUs, onNavigateHowTo }) => {
    const { theme } = useTheme();
    const { user, updateUser, resetData } = useUser();

    const [email, setEmail] = useState(savedEmail || '');
    const [name, setName] = useState(user.name || '');
    const [showWhoAmI, setShowWhoAmI] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const fileInputRef = useRef(null);

    const handleSave = () => {
        onSaveEmail(email);
        updateUser({ name });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateUser({ photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogOut = () => {
        CapacitorApp.exitApp();
    };

    const handleDeleteData = () => {
        if (confirm('Are you sure? This will delete ALL your data (stats, preferences, tier) and reset the app to the beginning.')) {
            resetData();
        }
    };

    const handleShare = async () => {
        try {
            await Share.share({
                title: 'Grimoire PDF to EPUB',
                text: 'Check out this magical app that converts PDFs to EPUBs for Kindle!',
                url: 'https://example.com/app',
                dialogTitle: 'Share with friends',
            });
        } catch (error) {
            console.error('Error sharing:', error);
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

            <div className="flex-1 overflow-y-auto pb-32">
                {/* Profile Section */}
                <Section title="Profile">
                    <div className="p-4 flex items-center gap-4">
                        <div className="relative">
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center border-2 overflow-hidden bg-cover bg-center"
                                style={{
                                    backgroundColor: `${theme.colors.accent}20`,
                                    borderColor: theme.colors.accent,
                                    backgroundImage: user.photo ? `url(${user.photo})` : 'none'
                                }}
                            >
                                {!user.photo && <User size={32} style={{ color: theme.colors.accent }} />}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 p-1.5 rounded-full shadow-md bg-white border"
                                style={{ borderColor: theme.colors.border }}
                            >
                                <Camera size={14} className="text-black" />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                className="bg-transparent font-serif font-bold text-lg w-full focus:outline-none border-b border-transparent focus:border-current transition-colors"
                                style={{ color: theme.colors.text }}
                                placeholder="Your Name"
                            />
                            <p className="text-sm opacity-60 mt-1" style={{ color: theme.colors.subtext }}>
                                {userTier === TIERS.FREE ? 'Novice Traveler' : userTier === TIERS.PREMIUM ? 'Scholar' : 'Archmage'}
                            </p>
                        </div>
                    </div>
                    <Item
                        icon={BookOpen}
                        label="My Tastes"
                        value={user.genres?.join(', ') || 'None selected'}
                    />
                </Section>

                {/* Preferences */}
                <Section title="Preferences">
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <BookOpen size={20} style={{ color: theme.colors.accent }} />
                            <span className="font-medium" style={{ color: theme.colors.text }}>Kindle Email</span>
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="username@kindle.com"
                            className="bg-transparent text-right text-sm focus:outline-none w-48"
                            style={{ color: theme.colors.subtext }}
                        />
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

                {/* Support */}
                <Section title="Support">
                    <Item icon={HelpCircle} label="How to Use" onClick={onNavigateHowTo} />
                    <Item icon={FileText} label="Why This App?" onClick={onNavigateWhyUs} />
                    <Item icon={Mail} label="Send Feedback" onClick={() => window.open('mailto:jelmaris.studio@gmail.com?subject=FEEDBACK', '_blank')} />
                </Section>

                {/* Community */}
                <Section title="Community">
                    <Item icon={Instagram} label="Follow on Instagram" onClick={() => window.open('https://instagram.com', '_blank')} />
                    <Item icon={Play} label="Follow on TikTok" onClick={() => window.open('https://tiktok.com', '_blank')} />
                    <Item icon={Share2} label="Share App" onClick={handleShare} />
                </Section>

                {/* About */}
                <Section title="About">
                    <Item icon={User} label="Who am I?" onClick={() => setShowWhoAmI(true)} />
                </Section>

                {/* Danger Zone */}
                <Section title="Account">
                    <Item icon={LogOut} label="Log Out" onClick={handleLogOut} />
                    <Item icon={Trash2} label="Delete My Data" isDestructive onClick={handleDeleteData} />
                </Section>

                {/* Version */}
                <div className="text-center opacity-40 text-xs pb-4 font-mono" style={{ color: theme.colors.subtext }}>
                    v2.7.0 (Archmage)
                </div>
            </div>

            {/* Save Button (Sticky Bottom) */}
            <div className="fixed bottom-6 left-0 right-0 px-6 z-20">
                <AnimatePresence>
                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute -top-16 left-0 right-0 mx-6 p-3 rounded-lg shadow-lg flex items-center justify-center gap-2 font-bold"
                            style={{ backgroundColor: theme.colors.accent, color: theme.colors.bg }}
                        >
                            <CheckCircle size={20} />
                            Changes Saved!
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={handleSave}
                    className="w-full py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                    style={{ backgroundColor: theme.colors.button, color: theme.colors.buttonText }}
                >
                    <Save size={20} />
                    Save Changes
                </button>
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
