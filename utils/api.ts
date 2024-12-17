import axios from "axios";
import { BASEURL } from "@env";

const api = axios.create({
	baseURL: BASEURL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
