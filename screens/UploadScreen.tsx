import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Button, Card, Modal, Portal, Text, Provider, IconButton, TextInput, List } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { uploadTest } from '../services/apiService';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const UploadScreen: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [data, setData] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Additional State
    const [category, setCategory] = useState<string | null>(null);
    const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
    const [storeName, setStoreName] = useState<string>('');
    const [purchaseDate, setPurchaseDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [totalAmount, setTotalAmount] = useState<string>('');
    const [note, setNote] = useState<string>('');


    // Handle image selection from library
    const handlePickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
                setUploadStatus(null);
            }
            setModalVisible(false); // Close the modal
        } catch (error) {
            console.error("Error picking image", error);
        }
    };

    // Handle taking a picture with the camera
    const handleTakePicture = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
                setUploadStatus(null);
            }
            setModalVisible(false); // Close the modal
        } catch (error) {
            console.error("Error taking picture", error);
        }
    };

    // Handle uploading the selected image
    const handleUploadImage = async () => {
        if (!selectedImage) {
            setUploadStatus("No image selected.");
            return;
        }

        try {
            const fileInfo = await FileSystem.getInfoAsync(selectedImage);

            if (!fileInfo.exists) {
                throw new Error("File does not exist at URI: " + selectedImage);
            }

            const fileBlob = {
                uri: selectedImage,
                name: "image.jpg",
                type: "image/jpeg",
            };

            const formData = new FormData();
            formData.append("file", fileBlob as any);

            const result = await uploadTest(formData);
            setData(result);
            setUploadStatus("Image uploaded successfully!");
        } catch (error) {
            console.error("Error uploading image", error);
            setUploadStatus("Error uploading image.");
        }
    };

    return (
        <Provider>
            <ScrollView contentContainerStyle={styles.container}>
                <Card style={styles.card} onPress={() => setModalVisible(true)}>
                    <View style={styles.cardContent}>
                        {/* Show IconButton and Text only if no image is selected */}
                        {!selectedImage && (
                            <>
                                <IconButton
                                    icon="cloud-upload"
                                    size={40}
                                    iconColor="#4A90E2"
                                    style={styles.icon}
                                />
                                <Text style={styles.title}>Upload File</Text>
                            </>
                        )}

                        {/* Show the selected image and the "X" button in a row */}
                        {selectedImage && (
                            <View style={styles.imageRow}>
                                <Image source={{ uri: selectedImage }} style={styles.image} />
                                <IconButton
                                    icon="close"
                                    size={24}
                                    iconColor="#FF0000"
                                    onPress={() => setSelectedImage(null)} // Clear the selected image
                                    style={styles.closeButton}
                                />
                            </View>
                        )}
                    </View>
                </Card>


                <Button mode="contained" onPress={handleUploadImage} style={styles.button}>
                    Upload Image
                </Button>

                {uploadStatus && <Text style={styles.status}>{uploadStatus}</Text>}
                {data && <Text style={styles.text}>{data}</Text>}

                <View style={styles.formArea}>
                    <List.Section title="Categories">
                        <List.Accordion
                            title="Select Categories">
                            <List.Item title="Groceries" />
                            <List.Item title="Shopping" />
                            <List.Item title="ETC" />
                        </List.Accordion>
                    </List.Section>

                    <TextInput
                        label="Store name"
                        value={storeName}
                        onChangeText={setStoreName}
                    />

                    <Text style={styles.label}>Purchase Date</Text>

                    <TextInput
                        label="Total"
                        keyboardType="numeric"
                        value={totalAmount}
                        onChangeText={setTotalAmount}
                    />

                    <TextInput
                        style={styles.input}
                        label="Note"
                        value={note}
                        onChangeText={setNote}
                        multiline
                    />
                </View>

                <Button mode="contained" onPress={handleUploadImage} style={styles.button}>
                    Upload
                </Button>

                {/* Modal for choosing options */}
                <Portal>
                    <Modal
                        visible={modalVisible}
                        onDismiss={() => setModalVisible(false)}
                        contentContainerStyle={styles.modalContainer}
                    >
                        <Text style={styles.modalTitle}>Choose an option</Text>
                        <Button mode="outlined" onPress={handlePickImage} style={styles.modalButton}>
                            Upload from Gallery
                        </Button>
                        <Button mode="outlined" onPress={handleTakePicture} style={styles.modalButton}>
                            Take a Picture
                        </Button>
                        <Button mode="text" onPress={() => setModalVisible(false)} style={styles.modalButton}>
                            Cancel
                        </Button>
                    </Modal>
                </Portal>
            </ScrollView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: '90%',
        borderWidth: 2,
        borderColor: '#4A90E2',
        borderStyle: 'dashed',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    cardContent: {
        alignItems: 'center',
    },
    icon: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A90E2',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#999999',
        textAlign: 'center',
    },
    imageRow: {
        flexDirection: 'row', // Horizontal layout
        alignItems: 'center', // Align image and button vertically
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    closeButton: {
        marginLeft: 10, // Add spacing between the image and button
    },
    button: {
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
    },
    status: {
        fontSize: 14,
        color: 'green',
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    modalButton: {
        marginVertical: 10,
    },
    formArea: {
        width: '90%', // container와 동일한 너비
        alignSelf: 'center', // 가운데 정렬
    },
    input: {
        marginVertical: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
        textAlign: "left",
    },
    textArea: {
        width: '100%', // formArea의 너비에 맞추기
        height: 100, // 원하는 높이 설정
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        textAlignVertical: 'top', // 멀티라인 입력 시 텍스트 상단 정렬
    },
});

export default UploadScreen;
