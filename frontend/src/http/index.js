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
        'Accept' : 'application/json'
        // Note: Content-Type is NOT set here - it will be set per request
        // For FormData, browser will set it automatically
        // For JSON, interceptor will set it
    }
})

APIAuthenticated.interceptors.request.use((config)=>{
    const token= localStorage.getItem('token');
    if(token){
        config.headers.Authorization=token;
    }
    // For FormData, ensure Content-Type is NOT set (browser will set it with boundary)
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
        delete config.headers['content-type'];
        console.log("📤 FormData request detected - Content-Type will be set by browser");
        console.log("  - URL:", config.url);
        console.log("  - Method:", config.method);
        console.log("  - Has token:", !!token);
    } else {
        // For non-FormData requests, set Content-Type to application/json
        if (!config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }
    }
    return config;
}, (error)=> Promise.reject(error)
)


export {API, APIAuthenticated}
