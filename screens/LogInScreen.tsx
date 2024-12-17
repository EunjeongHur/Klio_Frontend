import React, { useState } from "react";
import { Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../src/context/AuthContext";
import { Button, ButtonText, Container, Input, SwitchText, Title } from "../components/authComponents";


const LogInScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { setToken } = useAuth();

    const handleLogin = async () => {
        try {
            const fakeToken = "fake-token";
            setToken(fakeToken);
            Alert.alert("Success", "Logged in successfully!");
        } catch (error: any) {
            console.error("Login failed:", error.message);
            Alert.alert("Error", error.response?.data?.error || "Invalid credentials.");
        }
    };

    return (
        <Container>
            <Title>Login</Title>
            <Input
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
            />
            <Input
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button onPress={handleLogin}>
                <ButtonText>Login</ButtonText>
            </Button>
            <SwitchText onPress={() => navigation.navigate("SignUp")}>
                Don't have an account? Sign up
            </SwitchText>
        </Container>
    );
};

export default LogInScreen;
