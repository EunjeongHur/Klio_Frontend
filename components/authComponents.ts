import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: #f9f9f9;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const Title = styled.Text`
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
`;

export const Input = styled.TextInput`
    width: 100%;
    height: 50px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 16px;
    background-color: #fff;
`;

export const Button = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    background-color: #007bff;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-top: 10px;
`;

export const ButtonText = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: bold;
`;

export const SwitchText = styled.Text`
    color: #007bff;
    margin-top: 15px;
    font-size: 16px;
`;