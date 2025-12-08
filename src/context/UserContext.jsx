import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user_profile');
        return saved ? JSON.parse(saved) : {
            name: '',
            genres: [],
            source: '', // New field
            otherSource: '', // New field
            isOnboarded: false,
            photo: null,
            stats: {
                booksConverted: 0,
                pagesRead: 0
            }
        };
    });

    useEffect(() => {
        localStorage.setItem('user_profile', JSON.stringify(user));
    }, [user]);

    const updateUser = (updates) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    const completeOnboarding = (name, genres, source, otherSource) => {
        updateUser({
            name,
            genres,
            source,
            otherSource,
            isOnboarded: true
        });
    };

    const resetData = () => {
        localStorage.clear();
        setUser({
            name: '',
            genres: [],
            source: '',
            otherSource: '',
            isOnboarded: false,
            photo: null,
            stats: {
                booksConverted: 0,
                pagesRead: 0
            }
        });
        window.location.reload();
    };

    return (
        <UserContext.Provider value={{ user, updateUser, completeOnboarding, resetData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
