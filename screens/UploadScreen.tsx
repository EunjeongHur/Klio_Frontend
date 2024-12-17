import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { uploadTest } from '../services/apiService';

const UploadScreen: React.FC = () => {
    const [data, setData] = useState<string | null>(null);

    const handleFetchData = async () => {
        try {
            const result = await uploadTest();
            setData(result);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Fetch Data" onPress={handleFetchData} />
            {data && <Text style={styles.text}>{data}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default UploadScreen;
