import React from "react";
import { Text, Button, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../src/context/AuthContext";

export default function ProfileScreen({ onLogout }: { onLogout: () => void }) {
    const { setToken } = useAuth();
    const handleLogout = async () => {
        try {
            const result = true;
            if (result) {
                setToken(null);
                Alert.alert("Logged Out", "You have been logged out successfully.");
                onLogout();
            }
        } catch (error) {
            console.error("Logout failed:", error);
            Alert.alert("Error", "Failed to log out. Please try again.");
        }
    };

    const confirmLogout = () => {
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", onPress: handleLogout },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
            <Button title="Logout" onPress={confirmLogout} />
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
});
