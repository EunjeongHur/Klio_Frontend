import api from "../utils/api";

export const uploadTest = async () => {
    const response = await api.get(`/upload`);
    return response.data;
}