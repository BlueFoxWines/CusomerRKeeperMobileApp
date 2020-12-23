import { createStore } from "vuex"

import Auth from "./modules/auth"

const store = createStore({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        Auth
    }
})

export default store
