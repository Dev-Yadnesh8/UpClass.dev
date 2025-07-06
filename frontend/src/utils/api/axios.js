import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers:{
        'Content-Type' : 'application/json'
    }
});

export const axiosPrivateInstance = axios.create({
    baseURL: BASE_URL,
    headers:{
        'Content-Type' : 'application/json'
    },
    withCredentials:true
});