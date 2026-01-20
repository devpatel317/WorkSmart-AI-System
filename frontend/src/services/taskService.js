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

const user = localStorage.getItem("user")
const employeeId = JSON.parse(user)?._id
const internalKey = import.meta.env.VITE_INTERNAL_API_KEY;

export const getMyTask = () => API.get(`/tasks/get-tasks/${employeeId}`, {
    headers : {
        "x-internal-key" : internalKey
    }
})
export const getWorkHistory = () => API.get("/tasks/getWorkHistory")
export const createTask = (form) => API.post("/tasks/create-task", form)
export const updateTaskStatus = (taskId, status) => API.patch(`/tasks/${taskId}/status`, {status : status})
