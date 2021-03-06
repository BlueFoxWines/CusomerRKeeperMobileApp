import axios from "axios"

const HTTP = axios.create({
    baseURL: process.env.VUE_APP_API_AUTH_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": "ru-RU"
    }
})

export default HTTP
