import React, { useState } from "react";
import { Alert } from "react-native";
import { Button, ButtonText, Container, Input, SwitchText, Title } from "../components/authComponents";

const SignUpScreen = ({ navigation }: { navigation: any }) => {
    const [fname, setFname] = useState<string>("");
    const [lname, setLname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [budget, setBudget] = useState<string>("");

    const handleSignUp = async () => {
        try {
            console.log("Signing up with:", { fname, lname, email, password, budget });
            Alert.alert("Success", "(Test) Signed up successfully!");
            navigation.navigate("LogIn");
        } catch (error: any) {
            console.error("Signup failed:", error.message);
            Alert.alert("Error", error.response?.data?.error || "Failed to sign up.");
        }
    };

    const handleBudgetChange = (value: string) => {
        const numericValue = value.replace(/[^0-9.]/g, "");
        setBudget(numericValue);
    };

    return (
        <Container>
            <Title>Sign Up</Title>
            <Input
                placeholder="First Name"
                placeholderTextColor="#aaa"
                value={fname}
                onChangeText={setFname}
            />
            <Input
                placeholder="Last Name"
                placeholderTextColor="#aaa"
                value={lname}
                onChangeText={setLname}
            />
            <Input
                placeholder="Email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
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
            <Input
                placeholder="Budget"
                placeholderTextColor="#aaa"
                keyboardType="decimal-pad"
                value={budget}
                onChangeText={handleBudgetChange}
            />
            <Button onPress={handleSignUp}>
                <ButtonText>Sign Up</ButtonText>
            </Button>
            <SwitchText onPress={() => navigation.navigate("LogIn")}>
                Already have an account? Login
            </SwitchText>
        </Container>
    );
};

export default SignUpScreen;
