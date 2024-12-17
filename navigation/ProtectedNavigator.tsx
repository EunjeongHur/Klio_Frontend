import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import UploadScreen from '../screens/UploadScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useAuth } from '../src/context/AuthContext';

const Tab = createBottomTabNavigator();

const ProtectedNavigator = () => {
    const { setToken } = useAuth();

    const handleLogout = () => {
        setToken(null);
    }
    return (
        <Tab.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Upload" component={UploadScreen} />
            <Tab.Screen name="Profile">
                {(props) => <ProfileScreen {...props} onLogout={handleLogout} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default ProtectedNavigator;
