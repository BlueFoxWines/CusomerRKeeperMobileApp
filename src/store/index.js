import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"
import HTTP from "@/http"

import Auth from "./modules/auth"
import Contact from "./modules/contact"
import Booking from "./modules/booking"
import Order from "./modules/order"
import Profile from "./modules/profile"

import { LOGOUT } from "./actions/auth"

const store = createStore({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        Auth,
        Contact,
        Booking,
        Order,
        Profile
    },
    plugins: [createPersistedState()]
})

export default store

// Auth routine
if (store.state.Auth.Token) {
    HTTP.defaults.headers.common.Authorization = store.state.Auth.Token
}

// Unauthorized routine
HTTP.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (error.response.status === 401) {
        // if you ever get an unauthorized, logout the user
        store.dispatch(LOGOUT)
        return Promise.reject(error)
    }
    return Promise.reject(error)
})
