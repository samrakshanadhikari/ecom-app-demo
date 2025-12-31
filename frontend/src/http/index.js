import axios from "axios";

//without login
const API=axios.create({
    baseURL : 'https://ecom-app-demo-backend.onrender.com',
    headers :{
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    }
})

//authenticate user
const APIAuthenticated=axios.create({
    baseURL : 'https://ecom-app-demo-backend.onrender.com',
    headers :{
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    }
})

APIAuthenticated.interceptors.request.use((config)=>{
    const token= localStorage.getItem('token');
    if(token){
        config.headers.Authorization=token;
    }
    // For FormData, remove Content-Type header so browser can set it with boundary
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
        delete config.headers['content-type'];
        console.log("📤 FormData request detected - Content-Type will be set by browser");
        console.log("  - URL:", config.url);
        console.log("  - Method:", config.method);
        console.log("  - Has token:", !!token);
    }
    return config;
}, (error)=> Promise.reject(error)
)


export {API, APIAuthenticated}
