import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import ProtectedNavigator from './ProtectedNavigator';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../src/context/AuthContext';

const RootNavigator = () => {
    const { isAuthenticated } = useAuth();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                {isAuthenticated ? <ProtectedNavigator /> : <AuthNavigator />}
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default RootNavigator;
