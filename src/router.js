import { createRouter, createWebHistory } from "@ionic/vue-router"
import { alertController } from "@ionic/vue"
import store from "./store"
import Main from "@/views/Main.vue"

const routes = [
    {
        path: "/",
        redirect: "/main/menu"
    },
    {
        name: "Login",
        path: "/login",
        component: () => import("./views/Auth/Login.vue")
    },
    {
        name: "Main",
        path: "/main/",
        component: Main,
        children: [
            {
                path: "",
                redirect: "/main/menu"
            },
            {
                name: "Menu",
                path: "menu",
                component: () => import("@/views/Menu/Index.vue")
            },
            {
                name: "Orders",
                path: "orders",
                component: () => import("@/views/Order/Index.vue")
            },
            {
                name: "Profile",
                path: "profile",
                component: () => import("@/views/Profile/Index.vue")
            }
        ]
    },
    {
        name: "Booking",
        path: "/booking",
        component: () => import("./views/Order/Booking.vue"),
        meta: { RequiresAuth: true }
    },
    {
        name: "Order",
        path: "/order/:id",
        component: () => import("./views/Order/Single.vue"),
        meta: { RequiresAuth: true }
    },
    {
        name: "Pay",
        path: "/pay/:id",
        component: () => import("./views/Order/Pay.vue"),
        meta: { RequiresAuth: true }
    },
    {
        name: "About",
        path: "/about",
        component: () => import("./views/Misc/About.vue")
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

async function presentAlert(to) {
    const alert = await alertController
        .create({
            cssClass: "bluefox-modal",
            subHeader: "Выполните авторизацию",
            message: "Для того, чтобы воспользоваться этой функцией, необходимо войти в аккаунт",
            buttons: [{
                text: "Войти",
                cssClass: "button is-theme",
                handler: () => {
                    router.push({ name: "Login", query: { redirect: to.path } })
                }
            }]
        })
    return alert.present()
}

router.beforeEach(async (to) => {
    if (to.meta.RequiresAuth && !store.getters.IS_AUTHENTICATED) {
        presentAlert(to)
        return false
    }
    else return true
})

export default router
