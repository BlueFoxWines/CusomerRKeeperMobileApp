import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

import Auth from "./modules/auth"

const store = createStore({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        Auth
    },
    plugins: [createPersistedState()]
})

export default store
