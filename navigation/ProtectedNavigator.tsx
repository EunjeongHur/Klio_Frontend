import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import UploadScreen from '../screens/UploadScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons
import { useAuth } from '../src/context/AuthContext';

const Tab = createBottomTabNavigator();

const ProtectedNavigator = () => {
    const { setToken } = useAuth();

    const handleLogout = () => {
        setToken(null);
    };

    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    // Define icon names with a fallback
                    const iconName: string = (() => {
                        switch (route.name) {
                            case 'Dashboard':
                                return focused ? 'dashboard' : 'dashboard';
                            case 'Upload':
                                return focused ? 'cloud-upload' : 'cloud-upload';
                            case 'Profile':
                                return focused ? 'person' : 'person';
                            default:
                                return 'help-outline'; // Default fallback icon
                        }
                    })();

                    // Return MaterialIcons component
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007bff', // Active tab color
                tabBarInactiveTintColor: 'gray', // Inactive tab color
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Upload" component={UploadScreen} />
            <Tab.Screen name="Profile">
                {(props) => <ProfileScreen {...props} onLogout={handleLogout} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default ProtectedNavigator;
