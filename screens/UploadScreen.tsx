import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { uploadTest } from '../services/apiService';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const UploadScreen: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [data, setData] = useState<string | null>(null);

    const handlePickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri); // Save the URI of the selected image
                setUploadStatus(null); // Reset status
            }
        } catch (error) {
            console.error("Error picking image", error);
        }
    };

    const handleUploadImage = async () => {
        if (!selectedImage) {
            setUploadStatus("No image selected.");
            return;
        }

        try {
            // Read the file as a Blob using FileSystem
            const fileUri = selectedImage; // The URI of the selected image
            const fileInfo = await FileSystem.getInfoAsync(fileUri);

            if (!fileInfo.exists) {
                throw new Error("File does not exist at URI: " + fileUri);
            }

            // Convert to FormData-compatible Blob
            const fileBlob = {
                uri: fileUri,
                name: "image.jpg", // Provide a filename
                type: "image/jpeg", // MIME type of the image
            };

            const formData = new FormData();
            formData.append("file", fileBlob as any);

            const result = await uploadTest(formData); // Call the API
            setData(result);
            setUploadStatus("Image uploaded successfully!");
        } catch (error) {
            console.error("Error uploading image", error);
            setUploadStatus("Error uploading image.");
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={handlePickImage}>
                    <Text style={styles.buttonText}>Select Image</Text>
                </TouchableOpacity>
                {selectedImage && (
                    <Image source={{ uri: selectedImage }} style={styles.image} />
                )}
                <TouchableOpacity style={styles.button} onPress={handleUploadImage}>
                    <Text style={styles.buttonText}>Upload Image</Text>
                </TouchableOpacity>
                {uploadStatus && <Text style={styles.status}>{uploadStatus}</Text>}
                {data && <Text style={styles.text}>{data}</Text>}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    status: {
        fontSize: 14,
        color: 'green',
        marginTop: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default UploadScreen;
