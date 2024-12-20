import api from "../utils/api";

// GET all items
export const getItems = async () => {
	const response = await api.get(`/api/items`);
	return response.data;
};

// GET item by ID
export const getItemById = async (id: number) => {
	const response = await api.get(`/api/items/${id}`);
	return response.data;
};

// POST create a new item
export const createItem = async (item: {
	name: string;
	description: string;
}) => {
	const response = await api.post(`/api/items`, item);
	return response.data;
};

// PUT update an existing item by ID
export const updateItem = async (
	id: number,
	item: { name: string; description: string }
) => {
	const response = await api.put(`/api/items/${id}`, item);
	return response.data;
};

// DELETE an item by ID
export const deleteItem = async (id: number) => {
	const response = await api.delete(`/api/items/${id}`);
	return response.data;
};

export const uploadTest = async (formData: FormData) => {
	try {
		const response = await api.post("/api/ocr/process", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		console.log(response.data);
		return response.data; // OCR 결과 반환
	} catch (error) {
		console.error("API Error:", error);
		throw error;
	}
};
