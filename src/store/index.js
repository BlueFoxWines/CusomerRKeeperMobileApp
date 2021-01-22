import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

import Auth from "./modules/auth"
import Contact from "./modules/contact"
import Booking from "./modules/booking"

const store = createStore({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        Auth,
        Contact,
        Booking
    },
    plugins: [createPersistedState()]
})

export default store
