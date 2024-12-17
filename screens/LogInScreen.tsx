import React, { useState } from "react";
import { Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../src/context/AuthContext";

const LogInScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { setToken } = useAuth();

    const handleLogin = async () => {
        try {

            // Remove this code later
            const fakeToken = "fake-token";
            setToken(fakeToken);
            Alert.alert("Success", "Logged in successfully!");
        } catch (error: any) {
            console.error("Login failed:", error.message);
            Alert.alert("Error", error.response?.data?.error || "Invalid credentials.");
        }
    }

    return (
        <SafeAreaView>
            <Text>Login</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
            <Text
                onPress={() => navigation.navigate('SignUp')}
            >
                Don't have an account? Sign up
            </Text>
        </SafeAreaView>
    );
}

export default LogInScreen;