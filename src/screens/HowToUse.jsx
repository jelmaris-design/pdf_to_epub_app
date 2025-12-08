import React from 'react';
import { ArrowLeft, Upload, Settings, Book, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const HowToUse = ({ onBack }) => {
    const { theme } = useTheme();

    const Step = ({ number, icon: Icon, title, desc }) => (
        <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: theme.colors.accent, color: theme.colors.bg }}>
                {number}
            </div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Icon size={16} style={{ color: theme.colors.accent }} />
                    <h3 className="font-bold" style={{ color: theme.colors.text }}>{title}</h3>
                </div>
                <p className="text-sm opacity-80 leading-relaxed" style={{ color: theme.colors.subtext }}>{desc}</p>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-4 border-b" style={{ borderColor: theme.colors.border }}>
                <button
                    onClick={onBack}
                    className="p-2 rounded-full hover:opacity-70 transition-colors"
                    style={{ color: theme.colors.text }}
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold font-serif" style={{ color: theme.colors.text }}>How to Use</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <Step
                    number="1"
                    icon={Settings}
                    title="Setup Kindle Email"
                    desc="Go to Settings and enter your Send-to-Kindle email address (e.g., name@kindle.com). You can find this in your Amazon account settings."
                />

                <Step
                    number="2"
                    icon={Upload}
                    title="Select PDF"
                    desc="Tap the '+' button on the home screen to choose a PDF file from your device."
                />

                <Step
                    number="3"
                    icon={Book}
                    title="Edit Metadata"
                    desc="Review the book title and author. Add a cover image if you like!"
                />

                <Step
                    number="4"
                    icon={Send}
                    title="Convert & Send"
                    desc="Tap 'Convert'. Once finished, you can send it directly to your Kindle or download the EPUB file."
                />

                <div className="p-4 rounded-xl mt-8 text-sm opacity-70 border" style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.border, color: theme.colors.subtext }}>
                    <strong>Note:</strong> Ensure 'jelmaris.studio@gmail.com' (or your own email if sending manually) is added to your Approved Personal Document E-mail List on Amazon.
                </div>
            </div>
        </div>
    );
};

export default HowToUse;
