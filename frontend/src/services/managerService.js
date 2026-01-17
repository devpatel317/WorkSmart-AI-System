import axios from "axios"
import { API } from "../api/auth.api";

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken")
        console.log(token)
        if(token){
            config.headers.Authorization =  `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
)

export const getManagerTask = () => API.get("/tasks/getManagerTasks")