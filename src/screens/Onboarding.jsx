import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { ChevronRight, BookOpen, Palette, User, Check, Share2, Sparkles, FileText, Send, Smartphone } from 'lucide-react';

const GENRES = [
    'Fantasy', 'Sci-Fi', 'Romance', 'Mystery', 'Thriller',
    'Horror', 'Historical', 'Non-Fiction', 'Classics', 'Poetry'
];

const SOURCES = [
    'Friends', 'TikTok', 'YouTube', 'Instagram', 'Twitter', 'Other'
];

const Onboarding = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const { completeOnboarding } = useUser();
    const { theme, setTheme, themes } = useTheme();

    const [name, setName] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [source, setSource] = useState('');
    const [otherSource, setOtherSource] = useState('');

    const handleNext = () => {
        if (step < 5) setStep(step + 1);
        else handleFinish();
    };

    const handleFinish = () => {
        completeOnboarding(name, selectedGenres, source, otherSource);
        if (onComplete) onComplete();
    };

    const toggleGenre = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 0: // Intro / Utility Focus
                return (
                    <div className="text-center space-y-8 animate-fadeIn px-6">
                        <div className="flex justify-center gap-4 mb-4">
                            <div className="p-4 rounded-2xl bg-red-100 text-red-600">
                                <FileText size={32} />
                            </div>
                            <div className="self-center text-2xl opacity-50">→</div>
                            <div className="p-4 rounded-2xl bg-blue-100 text-blue-600">
                                <BookOpen size={32} />
                            </div>
                            <div className="self-center text-2xl opacity-50">→</div>
                            <div className="p-4 rounded-2xl bg-orange-100 text-orange-600">
                                <Smartphone size={32} />
                            </div>
                        </div>

                        <div>
                            <h1 className="text-3xl font-serif font-bold mb-2" style={{ color: theme.colors.text }}>
                                Grimoire
                            </h1>
                            <p className="text-lg font-medium opacity-90" style={{ color: theme.colors.text }}>
                                PDF to EPUB Converter
                            </p>
                        </div>

                        <p className="text-base opacity-70 leading-relaxed max-w-xs mx-auto" style={{ color: theme.colors.subtext }}>
                            Convert your documents instantly and send them directly to your Kindle or reading app.
                            <br /><br />
                            No PC required. Just pure utility.
                        </p>
                    </div>
                );

            case 1: // Welcome
                return (
                    <div className="text-center space-y-6 animate-fadeIn">
                        <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center border-2" style={{ backgroundColor: `${theme.colors.accent}20`, borderColor: theme.colors.accent }}>
                            <Sparkles size={48} style={{ color: theme.colors.accent }} />
                        </div>
                        <h1 className="text-4xl font-serif font-bold" style={{ color: theme.colors.text }}>Setup</h1>
                        <p className="text-xl opacity-80 max-w-xs mx-auto" style={{ color: theme.colors.subtext }}>
                            Let's customize your experience.
                        </p>
                    </div>
                );

            case 2: // Identity
                return (
                    <div className="space-y-6 animate-fadeIn w-full max-w-xs mx-auto">
                        <div className="text-center">
                            <User size={48} className="mx-auto mb-4" style={{ color: theme.colors.accent }} />
                            <h2 className="text-2xl font-serif font-bold" style={{ color: theme.colors.text }}>Who are you?</h2>
                            <p className="opacity-70 text-sm" style={{ color: theme.colors.subtext }}>What should we call you?</p>
                        </div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name..."
                            className="w-full bg-transparent border-b-2 p-3 text-center text-xl focus:outline-none transition-colors placeholder-opacity-50"
                            style={{ borderColor: theme.colors.accent, color: theme.colors.text }}
                            autoFocus
                        />
                    </div>
                );

            case 3: // Taste
                return (
                    <div className="space-y-6 animate-fadeIn w-full">
                        <div className="text-center">
                            <BookOpen size={48} className="mx-auto mb-4" style={{ color: theme.colors.accent }} />
                            <h2 className="text-2xl font-serif font-bold" style={{ color: theme.colors.text }}>Reading Interests</h2>
                            <p className="opacity-70 text-sm" style={{ color: theme.colors.subtext }}>What do you usually convert?</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {GENRES.map(genre => (
                                <button
                                    key={genre}
                                    onClick={() => toggleGenre(genre)}
                                    className={`px-4 py-2 rounded-full border transition-all ${selectedGenres.includes(genre)
                                        ? 'font-bold'
                                        : 'bg-transparent opacity-60 hover:opacity-100'
                                        }`}
                                    style={{
                                        backgroundColor: selectedGenres.includes(genre) ? theme.colors.accent : 'transparent',
                                        color: selectedGenres.includes(genre) ? theme.colors.bg : theme.colors.text,
                                        borderColor: theme.colors.accent
                                    }}
                                >
                                    {genre}
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 4: // Source
                return (
                    <div className="space-y-6 animate-fadeIn w-full">
                        <div className="text-center">
                            <Share2 size={48} className="mx-auto mb-4" style={{ color: theme.colors.accent }} />
                            <h2 className="text-2xl font-serif font-bold" style={{ color: theme.colors.text }}>Discovery</h2>
                            <p className="opacity-70 text-sm" style={{ color: theme.colors.subtext }}>How did you find us?</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {SOURCES.map(s => (
                                <button
                                    key={s}
                                    onClick={() => setSource(s)}
                                    className={`p-3 rounded-xl border transition-all ${source === s
                                        ? 'font-bold shadow-md scale-105'
                                        : 'bg-transparent opacity-60 hover:opacity-100'
                                        }`}
                                    style={{
                                        backgroundColor: source === s ? theme.colors.accent : 'transparent',
                                        color: source === s ? theme.colors.bg : theme.colors.text,
                                        borderColor: theme.colors.accent
                                    }}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                        {source === 'Other' && (
                            <input
                                type="text"
                                value={otherSource}
                                onChange={(e) => setOtherSource(e.target.value)}
                                placeholder="Please specify..."
                                className="w-full bg-transparent border-b p-2 text-center focus:outline-none animate-fadeIn"
                                style={{ borderColor: theme.colors.accent, color: theme.colors.text }}
                                autoFocus
                            />
                        )}
                    </div>
                );

            case 5: // Theme
                return (
                    <div className="space-y-6 animate-fadeIn w-full">
                        <div className="text-center">
                            <Palette size={48} className="mx-auto mb-4" style={{ color: theme.colors.accent }} />
                            <h2 className="text-2xl font-serif font-bold" style={{ color: theme.colors.text }}>App Theme</h2>
                            <p className="opacity-70 text-sm" style={{ color: theme.colors.subtext }}>Choose your style.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {Object.values(themes).map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setTheme(t.id)}
                                    className={`p-4 rounded-lg border-2 flex items-center justify-between transition-all ${theme.id === t.id
                                        ? 'shadow-lg scale-105'
                                        : 'hover:opacity-80'
                                        }`}
                                    style={{
                                        backgroundColor: t.colors.bg,
                                        color: t.colors.text,
                                        borderColor: theme.id === t.id ? theme.colors.accent : 'transparent'
                                    }}
                                >
                                    <span className="font-serif font-bold">{t.name}</span>
                                    {theme.id === t.id && <Check size={20} color={t.colors.accent} />}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 transition-colors duration-500"
            style={{ backgroundColor: theme.colors.bg, color: theme.colors.text }}>

            {/* Progress Dots */}
            <div className="absolute top-10 flex gap-2">
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === step ? 'w-6' : 'opacity-20'
                            }`}
                        style={{ backgroundColor: theme.colors.accent }}
                    />
                ))}
            </div>

            <div className="flex-1 flex flex-col justify-center w-full max-w-md">
                {renderStep()}
            </div>

            <button
                onClick={handleNext}
                disabled={(step === 2 && !name.trim()) || (step === 4 && !source) || (step === 4 && source === 'Other' && !otherSource.trim())}
                className="mb-10 flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                style={{ backgroundColor: theme.colors.button, color: theme.colors.buttonText }}
            >
                {step === 5 ? 'Start Converting' : 'Continue'}
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Onboarding;
