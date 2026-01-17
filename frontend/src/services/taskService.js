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

export const getMyTask = () => API.get("/tasks/get-tasks")
export const getWorkHistory = () => API.get("tasks/getWorkHistory")
export const createTask = (form) => API.post("tasks/create-task", form)
export const updateTaskStatus = (taskId) => API.patch(`/tasks/${taskId}/status`, {status : "completed"})
