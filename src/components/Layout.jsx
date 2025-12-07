import React from 'react';
import { BookOpen, Settings } from 'lucide-react';
import AdPlaceholder from './AdPlaceholder';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children, showAds, onRemoveAds, onOpenSettings }) => {
    const { theme } = useTheme();

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
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${theme.colors.accent}20` }}>
                        <BookOpen className="w-6 h-6" style={{ color: theme.colors.accent }} />
                    </div>
                    <h1 className="text-xl font-bold font-serif" style={{ color: theme.colors.accent }}>
                        PDF to EPUB
                    </h1>
                </div>
                <button
                    onClick={onOpenSettings}
                    className="p-2 rounded-full transition-colors hover:bg-black/5"
                    style={{ color: theme.colors.secondary }}
                >
                    <Settings className="w-6 h-6" />
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 relative">
                <div className="max-w-md mx-auto h-full">
                    {children}
                </div>
            </main>

            {/* Footer / Ad */}
            {showAds && <AdPlaceholder onRemoveAds={onRemoveAds} />}
        </div>
    );
};

export default Layout;
