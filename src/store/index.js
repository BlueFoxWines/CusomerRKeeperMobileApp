import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"
import HTTP from "@/http"

import Auth from "./modules/auth"
import Contact from "./modules/contact"
import Booking from "./modules/booking"
import Order from "./modules/order"

const store = createStore({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        Auth,
        Contact,
        Booking,
        Order
    },
    plugins: [createPersistedState()]
})

export default store

// Auth routine
if (store.state.Auth.Token) {
    HTTP.defaults.headers.common.Authorization = store.state.Auth.Token
}
