import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import ProtectedNavigator from './ProtectedNavigator';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            // Use this code to check auth
            const token = await AsyncStorage.getItem("token");
            setIsAuthenticated(!!token);
        };
        checkAuth();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                {isAuthenticated ? (
                    <ProtectedNavigator onLogout={() => setIsAuthenticated(false)} />
                ) : (
                    <AuthNavigator onLogin={() => setIsAuthenticated(true)} />
                )}
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default RootNavigator;
