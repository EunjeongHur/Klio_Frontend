import axios from "axios";

const api = axios.create({
    //baseURL: "http://10.0.2.2:8080",
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;