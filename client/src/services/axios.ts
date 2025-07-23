import axios from "axios"

const instance = axios.create({
    baseURL: import.meta.env.VITE_PATH_URL_API,
    withCredentials: true
})

export default instance