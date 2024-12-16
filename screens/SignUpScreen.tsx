import React, { useState } from "react";
import { Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpScreen = ({ navigation }: { navigation: any }) => {
    const [fname, setFname] = useState<string>("");
    const [lname, setLname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [budget, setBudget] = useState<string>("");

    const handleSignUp = async () => {
        try {
            console.log("Signing up with:", { fname, lname, email, password, budget });
            Alert.alert("Success", "(Test)Signed up successfully!");
            navigation.navigate("LogIn");
        } catch (error: any) {
            console.error("Signup failed:", error.message);
            Alert.alert("Error", error.response?.data?.error || "Failed to sign up.");
        }
    };

    const handleBudgetChange = (value: string) => {
        const numericValue = value.replace(/[^0-9.]/g, '');
        setBudget(numericValue);
    };



    return (
        <SafeAreaView>
            <Text>SignUp</Text>
            <TextInput
                placeholder="First Name"
                value={fname}
                onChangeText={setFname}
            />
            <TextInput
                placeholder="Last Name"
                value={lname}
                onChangeText={setLname}
            />
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
            <TextInput
                placeholder="Budget"
                keyboardType="decimal-pad"
                value={budget}
                onChangeText={handleBudgetChange}
            />
            <Button title="SignUp" onPress={handleSignUp} />
            <Text
                onPress={() => navigation.navigate("LogIn")}
            >
                Already have an account? Login
            </Text>
        </SafeAreaView>
    );
}

export default SignUpScreen;