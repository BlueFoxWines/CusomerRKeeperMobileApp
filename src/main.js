// VUE APP
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

// VENDORS
import { IonicVue } from "@ionic/vue"

// STYLES
import "./styles.scss"

// CUSTOMS
import i18n from "./i18n"

// BUILD
const app = createApp(App)
    .use(IonicVue, {
        mode: "ios",
        backButtonIcon: "assets/icon_back.svg",
        backButtonText: ""
    })
    .use(router)
    .use(store)
    .use(i18n)

router.isReady().then(() => {
    app.mount("#app")
})
