import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="LogIn">
                {(props) => <LogInScreen {...props} />}
            </AuthStack.Screen>
            <AuthStack.Screen name="SignUp">
                {(props) => <SignUpScreen {...props} />}
            </AuthStack.Screen>
        </AuthStack.Navigator>
    );
};

export default AuthNavigator;
