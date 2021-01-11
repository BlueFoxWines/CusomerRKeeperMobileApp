import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

import Auth from "./modules/auth"
import Contact from "./modules/contact"

const store = createStore({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        Auth,
        Contact
    },
    plugins: [createPersistedState()]
})

export default store
