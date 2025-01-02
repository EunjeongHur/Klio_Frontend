import React, { useState } from "react";
import { Alert, ActivityIndicator } from "react-native";
import { Button, ButtonText, Container, Input, SwitchText, Title } from "../components/authComponents";
import { signUp } from "../services/apiService";
import { validatePassword } from "../utils/passwordValidator";

const SignUpScreen = ({ navigation }: { navigation: any }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fname, setFname] = useState<string>("");
    const [lname, setLname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [budget, setBudget] = useState<string>("");

    const handleSignUp = async () => {
        if (!fname || !lname || !email || !password || !budget) {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
            Alert.alert("Password Requirements", passwordErrors.join("\n"));
            return;
        }

        try {
            setIsLoading(true);
            console.log("Signing up with:", { fname, lname, email, password, budget });
            const result = await signUp({ fname, lname, email, password, budget: parseFloat(budget) });
            Alert.alert("Success", "Signed up successfully!");
            navigation.navigate("LogIn");
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to sign up.";
            Alert.alert("Error", errorMessage);
        } finally {
            setIsLoading(false);
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
            <Button onPress={handleSignUp} disabled={isLoading}>
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <ButtonText>Sign Up</ButtonText>
                )}
            </Button>
            <SwitchText onPress={() => navigation.navigate("LogIn")}>
                Already have an account? Login
            </SwitchText>
        </Container>
    );
};

export default SignUpScreen;
