import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { getItems, getItemById, createItem, updateItem, deleteItem } from '../services/apiService';

const TestScreen: React.FC = () => {
    const [data, setData] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [itemId, setItemId] = useState<number | string>('');

    const handleFetchData = async (action: string) => {
        try {
            let result;
            if (action === 'GET_ALL') {
                result = await getItems();
            } else if (action === 'GET_BY_ID' && itemId) {
                result = await getItemById(Number(itemId));
            } else if (action === 'POST' && name && description) {
                const newItem = { name, description };
                result = await createItem(newItem);
            } else if (action === 'PUT' && itemId && name && description) {
                const updatedItem = { name, description };
                result = await updateItem(Number(itemId), updatedItem);
            } else if (action === 'DELETE' && itemId) {
                result = await deleteItem(Number(itemId));
            }
            setData(JSON.stringify(result, null, 2));
            console.log(result);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Item Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Item Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Item ID (for Get, Update, Delete)"
                keyboardType="numeric"
                value={itemId.toString()}
                onChangeText={(text) => setItemId(text)}
            />

            <Button title="Get All Data" onPress={() => handleFetchData('GET_ALL')} />
            <Button title="Get Data by ID" onPress={() => handleFetchData('GET_BY_ID')} />
            <Button title="Post Data" onPress={() => handleFetchData('POST')} />
            <Button title="Update Data by ID" onPress={() => handleFetchData('PUT')} />
            <Button title="Delete Data by ID" onPress={() => handleFetchData('DELETE')} />

            <Text style={styles.text}>
                {data ? data : "Results will be shown here"}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        width: '100%',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
});

export default TestScreen;
