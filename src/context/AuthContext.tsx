import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    isAuthenticated: boolean;
    token: string | null;
    setToken: (token: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    const isAuthenticated = !!token;

    const saveToken = async (newToken: string | null) => {
        setToken(newToken);
        if (newToken) {
            await AsyncStorage.setItem('userToken', newToken);
        } else {
            await AsyncStorage.removeItem('userToken');
        }
    };

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await AsyncStorage.getItem('userToken');
            setToken(storedToken);
        };
        loadToken();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, setToken: saveToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
