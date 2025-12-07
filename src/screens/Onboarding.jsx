import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { ChevronRight, BookOpen, Palette, User, Check } from 'lucide-react';

const GENRES = [
    'Fantasy', 'Sci-Fi', 'Romance', 'Mystery', 'Thriller',
    'Horror', 'Historical', 'Non-Fiction', 'Classics', 'Poetry'
];

const Onboarding = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const { completeOnboarding } = useUser();
    const { theme, setTheme, themes } = useTheme();

    const [name, setName] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else handleFinish();
    };

    const handleFinish = () => {
        completeOnboarding(name, selectedGenres);
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
            case 0: // Welcome
                return (
                    <div className="text-center space-y-6 animate-fadeIn">
                        <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center border-2" style={{ backgroundColor: `${theme.colors.accent}20`, borderColor: theme.colors.accent }}>
                            <BookOpen size={48} style={{ color: theme.colors.accent }} />
                        </div>
                        <h1 className="text-4xl font-serif font-bold" style={{ color: theme.colors.text }}>Welcome</h1>
                        <p className="text-xl opacity-80 max-w-xs mx-auto" style={{ color: theme.colors.subtext }}>
                            Your personal library awaits. Let's curate your experience.
                        </p>
                    </div>
                );

            case 1: // Identity
                return (
                    <div className="space-y-6 animate-fadeIn w-full max-w-xs mx-auto">
                        <div className="text-center">
                            <User size={48} className="mx-auto mb-4" style={{ color: theme.colors.accent }} />
                            <h2 className="text-2xl font-serif font-bold" style={{ color: theme.colors.text }}>Who are you?</h2>
                            <p className="opacity-70 text-sm" style={{ color: theme.colors.subtext }}>How should we address you, traveler?</p>
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

            case 2: // Taste
                return (
                    <div className="space-y-6 animate-fadeIn w-full">
                        <div className="text-center">
                            <BookOpen size={48} className="mx-auto mb-4" style={{ color: theme.colors.accent }} />
                            <h2 className="text-2xl font-serif font-bold" style={{ color: theme.colors.text }}>Your Taste</h2>
                            <p className="opacity-70 text-sm" style={{ color: theme.colors.subtext }}>What stories whisper to you?</p>
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

            case 3: // Theme
                return (
                    <div className="space-y-6 animate-fadeIn w-full">
                        <div className="text-center">
                            <Palette size={48} className="mx-auto mb-4" style={{ color: theme.colors.accent }} />
                            <h2 className="text-2xl font-serif font-bold" style={{ color: theme.colors.text }}>Atmosphere</h2>
                            <p className="opacity-70 text-sm" style={{ color: theme.colors.subtext }}>Choose your reading sanctuary.</p>
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
                {[0, 1, 2, 3].map(i => (
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
                disabled={step === 1 && !name.trim()}
                className="mb-10 flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                style={{ backgroundColor: theme.colors.button, color: theme.colors.buttonText }}
            >
                {step === 3 ? 'Enter Library' : 'Continue'}
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Onboarding;
