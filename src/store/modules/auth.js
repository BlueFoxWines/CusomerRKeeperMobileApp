// // eslint-disable-next-line no-unused-vars
// import VueCookies from "vue-cookies"
// import HTTP from "@/http"
// import Helpers from "@/utils/Helpers"
// import {
//     LOGIN_REQUEST,
//     LOGIN_REQUEST_ERROR,
//     LOGIN_TOKEN_RECEIVE,
//     LOGIN_TOKEN_SET,
//     LOGOUT_REQUEST,
//     LOGOUT_REQUEST_ERROR
// } from "../actions/auth"

// const state = {
//     Status: null,
//     Token: Helpers.checkToken("AuthToken") || null,
//     ExpirationDate: Helpers.checkToken("ExpirationDate") || null
// }

// const getters = {
//     IS_AUTHENTICATED: (state) => !!state.Token
// }

// const actions = {
//     [LOGIN_REQUEST]: ({ commit }) => {
//         try {
//             commit(LOGIN_REQUEST)
//             Helpers.redirectToGotoLoginApp("login", `${window.location.origin}/login`)
//         }
//         catch (error) {
//             commit(LOGIN_REQUEST_ERROR, error)
//         }
//     },
//     [LOGIN_TOKEN_RECEIVE]: ({ commit }, payload) => new Promise((resolve, reject) => {
//         commit(LOGIN_TOKEN_RECEIVE)
//         if (
//             payload
//             && payload.AuthToken
//             && payload.AuthToken.startsWith("Bearer")
//             && payload.ExpirationDate
//         ) {
//             resolve()
//             commit(LOGIN_TOKEN_SET, payload)
//         }
//         else reject()
//     }),
//     [LOGOUT_REQUEST]: ({ commit }) => new Promise(() => {
//         try {
//             commit(LOGOUT_REQUEST)
//             Helpers.redirectToGotoLoginApp("logout", `${window.location.origin}/login`)
//         }
//         catch (error) {
//             commit(LOGOUT_REQUEST_ERROR, error)
//         }
//     })
// }

// const mutations = {
//     [LOGIN_REQUEST]: (state) => {
//         state.Status = "login request"
//     },
//     [LOGIN_REQUEST_ERROR]: (state) => {
//         state.Status = "login request error"
//         // Helpers.notify("is-danger", i18n.t("Message.SSO.LoginRequestError"))
//     },

//     [LOGIN_TOKEN_RECEIVE]: (state) => {
//         state.Status = "auth token received"
//     },
//     [LOGIN_TOKEN_SET]: (state, payload) => {
//         try {
//             state.Token = payload.AuthToken
//             state.ExpirationDate = payload.ExpirationDate
//             const ExpireDate = new Date(state.ExpirationDate).toString()
//             window.$cookies.set("AuthToken", state.Token, ExpireDate)
//             window.$cookies.set("ExpirationDate", state.ExpirationDate, ExpireDate)
//             HTTP.defaults.headers.common.Authorization = state.Token
//             state.Status = "login success"
//         }
//         catch (error) {
//             state.Status = `login error: ${error}`
//         }
//     },

//     [LOGOUT_REQUEST]: (state) => {
//         state.Status = null
//         state.Token = null
//         state.ExpirationDate = null
//         delete HTTP.defaults.headers.common.Authorization
//         window.$cookies.remove("AuthToken")
//         window.$cookies.remove("ExpirationDate")
//     },
//     [LOGOUT_REQUEST_ERROR]: (state) => {
//         state.Status = "logout request error"
//         // Helpers.notify("is-danger", i18n.t("Message.SSO.LoginRequestError"))
//     }
// }

// export default {
//     state,
//     getters,
//     actions,
//     mutations
// }
