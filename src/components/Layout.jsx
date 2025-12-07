import React, { useState, useEffect } from 'react';
import { BookOpen, Settings, Plus, Book } from 'lucide-react';
import AdPlaceholder from './AdPlaceholder';
import { useTheme } from '../context/ThemeContext';
import { getRemainingConversions, TIERS, getUserTier } from '../utils/userTier';

const Layout = ({ children, showAds, onRemoveAds, onOpenSettings }) => {
    const { theme } = useTheme();
    const [remaining, setRemaining] = useState(getRemainingConversions());
    const [userTier, setUserTier] = useState(getUserTier());

    // Update remaining count periodically or on focus (simple implementation)
    useEffect(() => {
        const updateStats = () => {
            setRemaining(getRemainingConversions());
            setUserTier(getUserTier());
        };
        updateStats();
        window.addEventListener('focus', updateStats);
        return () => window.removeEventListener('focus', updateStats);
    }, []);

    const handleAddMana = () => {
        alert("Watch a short spell (ad) to replenish your ink? (Coming Soon)");
    };

    return (
        <div
            className="flex flex-col h-screen font-serif overflow-hidden transition-colors duration-300"
            style={{ backgroundColor: theme.colors.bg, color: theme.colors.text }}
        >
            {/* Header */}
            <header
                className="shadow-sm px-4 py-3 flex items-center justify-between shrink-0 z-10 transition-colors duration-300 border-b"
                style={{
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border
                }}
            >
                {/* Mana / Book Counter System */}
                <div className="flex items-center gap-3">
                    <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all"
                        style={{
                            backgroundColor: `${theme.colors.accent}10`,
                            borderColor: theme.colors.accent
                        }}
                    >
                        <Book size={16} style={{ color: theme.colors.accent }} />
                        <span className="font-bold font-mono text-sm" style={{ color: theme.colors.text }}>
                            {userTier === TIERS.FREE ? remaining : '∞'}
                        </span>

                        {userTier === TIERS.FREE && (
                            <button
                                onClick={handleAddMana}
                                className="ml-1 p-0.5 rounded-full hover:bg-black/10 transition-colors"
                                style={{ color: theme.colors.accent }}
                            >
                                <Plus size={14} strokeWidth={3} />
                            </button>
                        )}
                    </div>
                </div>

                <button
                    onClick={onOpenSettings}
                    className="p-2 rounded-full transition-colors hover:bg-black/5"
                    style={{ color: theme.colors.secondary || theme.colors.text }}
                >
                    <Settings className="w-6 h-6" />
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 relative">
                <div className="max-w-md mx-auto min-h-full pb-20">
                    {children}
                </div>
            </main>

            {/* Footer / Ad */}
            {showAds && <AdPlaceholder onRemoveAds={onRemoveAds} />}
        </div>
    );
};

export default Layout;
