import React, { createContext, useContext, useState, useEffect } from 'react';

const themes = {
    dark_academia: {
        id: 'dark_academia',
        name: 'Dark Academia',
        type: 'dark',
        colors: {
            bg: '#1e1e24',       // Very Dark Blue/Black
            card: '#2d2d36',     // Slightly lighter for cards
            text: '#d8c3a5',     // Light Beige (High Contrast)
            subtext: '#b0a698',  // Taupe
            accent: '#d8c3a5',   // Matching text for elegance
            border: '#4f3d36',   // Dark Brown
            button: '#7d6759',   // Brown
            buttonText: '#fff'
        }
    },
    pastel_summer: {
        id: 'pastel_summer',
        name: 'Pastel Summer',
        type: 'light',
        colors: {
            bg: '#fff5eb',       // Very light cream (Derived for readability)
            card: '#ffffff',     // White
            text: '#5c4040',     // Dark Brown/Mauve (Derived for contrast)
            subtext: '#b5838d',  // Mauve
            accent: '#e5989b',   // Rose
            border: '#ffcdb2',   // Peach
            button: '#b5838d',   // Mauve
            buttonText: '#fff'
        }
    },
    summer_sky: {
        id: 'summer_sky',
        name: 'Summer Sky',
        type: 'light',
        colors: {
            bg: '#f0f8ff',       // Alice Blue (Lightest)
            card: '#ffffff',     // White
            text: '#1a365d',     // Dark Navy (Derived for contrast)
            subtext: '#5c6b73',  // Grey Blue
            accent: '#87ceeb',   // Sky Blue
            border: '#bfefff',   // Light Blue
            button: '#87ceeb',   // Sky Blue
            buttonText: '#1a365d'
        }
    },
    moody_neutrals: {
        id: 'moody_neutrals',
        name: 'Moody Neutrals',
        type: 'light',
        colors: {
            bg: '#e5e8ec',       // Light Grey
            card: '#ffffff',     // White
            text: '#232f34',     // Dark Slate (High Contrast)
            subtext: '#5c6b73',  // Slate
            accent: '#232f34',   // Dark Slate
            border: '#bbc2c5',   // Light Grey
            button: '#232f34',   // Dark Slate
            buttonText: '#ffffff'
        }
    },
    secret_garden: {
        id: 'secret_garden',
        name: 'Secret Garden',
        type: 'light',
        colors: {
            bg: '#fcfdf5',       // Off White
            card: '#ffffff',     // White
            text: '#473c33',     // Dark Brown (High Contrast)
            subtext: '#7d6759',  // Lighter Brown
            accent: '#abc270',   // Green
            border: '#fec868',   // Yellow
            button: '#abc270',   // Green
            buttonText: '#473c33'
        }
    }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [currentThemeId, setCurrentThemeId] = useState(() => {
        return localStorage.getItem('app_theme') || 'dark_academia';
    });

    const theme = themes[currentThemeId] || themes.dark_academia;

    useEffect(() => {
        localStorage.setItem('app_theme', currentThemeId);
        // Apply theme to body for global background
        document.body.style.backgroundColor = theme.colors.bg;
        document.body.style.color = theme.colors.text;
    }, [currentThemeId, theme]);

    const setTheme = (id) => {
        if (themes[id]) {
            setCurrentThemeId(id);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
