import { createRouter, createWebHistory } from "@ionic/vue-router"
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
        component: () => import("./views/Order/Booking.vue")
    },
    {
        name: "Pay",
        path: "/pay",
        component: () => import("./views/Order/Pay.vue")
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

export default router
