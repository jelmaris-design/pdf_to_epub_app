import React from 'react';
import { BookOpen, Settings } from 'lucide-react';
import AdPlaceholder from './AdPlaceholder';

const Layout = ({ children, showAds, onRemoveAds, onOpenSettings }) => {
    return (
        <div className="flex flex-col h-screen bg-background text-gray-800 font-sans overflow-hidden">
            {/* Header */}
            <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between shrink-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="bg-primary/20 p-2 rounded-lg">
                        <BookOpen className="w-6 h-6 text-teal-600" />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-teal-500 to-primary bg-clip-text text-transparent">
                        PDF to EPUB
                    </h1>
                </div>
                <button onClick={onOpenSettings} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
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
