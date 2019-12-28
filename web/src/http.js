import axios from "axios"
import Vue from "vue"
import router from "./router"


const http = axios.create({
    baseURL: "http://localhost:3000"
})

http.interceptors.request.use((config) => {
    if (localStorage.token) {
        config.headers.Authorization = "Bearer " + (localStorage.token || "")
    } return config
}, err => {
    return Promise.reject(err)
})

//添加一个反应拦截器
http.interceptors.response.use(res => {
    return res
}, err => {

    if (err.response.data.error) {
        console.log(err.response.data)
        Vue.prototype.$notify({
            type: "error",
            message: err.response.data.message
        })
        if (err.response.status == 401) {
            // router.push("/login")
        }
    }

    return Promise.reject(err)
})

export default http