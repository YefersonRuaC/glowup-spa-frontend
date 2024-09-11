import axios from "axios";

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
})

//Registering interceptor which is applied to all requests before being send to backend
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if(token) {
        //Add authorization header using Bearer and token
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api