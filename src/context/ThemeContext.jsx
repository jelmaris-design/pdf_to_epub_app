import React, { createContext, useContext, useState, useEffect } from 'react';

const themes = {
    espresso: {
        id: 'espresso',
        name: 'Espresso',
        colors: {
            bg: '#1a1614',
            card: '#f5e6d3',
            text: '#2b2118',
            accent: '#c5a059',
            secondary: '#5c4d3c',
            border: '#c5a059',
        }
    },
    midnight: {
        id: 'midnight',
        name: 'Midnight Library',
        colors: {
            bg: '#0f172a',
            card: '#1e293b',
            text: '#e2e8f0',
            accent: '#94a3b8',
            secondary: '#64748b',
            border: '#475569',
        }
    },
    botanical: {
        id: 'botanical',
        name: 'Botanical',
        colors: {
            bg: '#1c2321',
            card: '#eaddcf',
            text: '#2d3a28',
            accent: '#d4a373',
            secondary: '#52796f',
            border: '#84a98c',
        }
    }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [currentThemeId, setCurrentThemeId] = useState(() => {
        return localStorage.getItem('app_theme') || 'espresso';
    });

    const theme = themes[currentThemeId];

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
