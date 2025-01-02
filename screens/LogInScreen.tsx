import React, { useState } from "react";
import { Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../src/context/AuthContext";
import { Button, ButtonText, Container, Input, SwitchText, Title } from "../components/authComponents";
import { logIn } from "../services/apiService";


const LogInScreen = ({ navigation }: { navigation: any }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { setToken } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "All fields are required.");
            return;
        }
        try {
            setIsLoading(true);
            const result = await logIn(email, password);
            console.log(result.token);
            setToken(result.token);

            Alert.alert("Success", "Logged in successfully!");
        } catch (error: any) {
            Alert.alert("Error", error.response?.data?.error || "Invalid credentials.");
        } finally {
            setIsLoading(false);
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
