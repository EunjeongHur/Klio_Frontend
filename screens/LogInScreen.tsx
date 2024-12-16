import React, { useState } from "react";
import { Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const LogInScreen = ({ navigation, onLogin }: { navigation: any; onLogin: () => void }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async () => {
        try {

            // await AsyncStorage.setItem("userId", data.user.id.toString());
            // await AsyncStorage.setItem("token", data.token);

            // Remove this code later
            await AsyncStorage.setItem("token", "test-token");
            Alert.alert("Success", "Logged in successfully!");
            onLogin();
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