import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user_profile');
        return saved ? JSON.parse(saved) : {
            name: '',
            genres: [],
            isOnboarded: false,
            photo: null, // Base64 string or null
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

    const completeOnboarding = (name, genres) => {
        updateUser({
            name,
            genres,
            isOnboarded: true
        });
    };

    return (
        <UserContext.Provider value={{ user, updateUser, completeOnboarding }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
