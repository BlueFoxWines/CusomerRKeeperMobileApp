// // eslint-disable-next-line no-unused-vars
// import VueCookies from "vue-cookies"
import HTTP from "@/http"
import Helpers from "@/utils/Helpers"
import {
    LOGIN_REQUEST_SENDCODE,
    LOGIN_REQUEST_SENDCODE_SUCCESS,
    LOGIN_REQUEST_SENDCODE_ERROR,

    LOGIN_REQUEST_TOKEN,
    LOGIN_REQUEST_TOKEN_SUCCESS,
    LOGIN_REQUEST_TOKEN_ERROR
} from "../actions/auth"

const state = {
    Status: null,
    Token: null,
    ExpirationDate: null
}

const getters = {
    IS_AUTHENTICATED: (state) => !!state.Token
}

const actions = {
    [LOGIN_REQUEST_SENDCODE]: ({ commit }, payload) => new Promise((resolve, reject) => {
        commit(LOGIN_REQUEST_SENDCODE)
        HTTP({
            url: "account/sendsms",
            method: "GET",
            params: {
                phone: payload
            }
        })
            .then((response) => {
                resolve(response)
                if (response && response.status === 200 && response.data && response.data.result && response.data.result === "success") {
                    commit(LOGIN_REQUEST_SENDCODE_SUCCESS)
                }
                else {
                    // Helpers.notify(
                    //     "is-danger",
                    //     i18n.t("Message.Backend.NoData")
                    // )
                }
            })
            .catch((error) => {
                reject(error)
                commit(LOGIN_REQUEST_SENDCODE_ERROR, error)
            })
    }),
    [LOGIN_REQUEST_TOKEN]: ({ commit }, payload) => new Promise((resolve, reject) => {
        commit(LOGIN_REQUEST_TOKEN)
        HTTP({
            url: "account/login",
            method: "GET",
            params: {
                phone: payload.Phone,
                code: payload.Code
            }
        })
            .then((response) => {
                resolve(response)
                if (response && response.status === 200 && response.data && response.data.token) {
                    commit(LOGIN_REQUEST_TOKEN_SUCCESS, response.data)
                }
                else {
                    // Helpers.notify(
                    //     "is-danger",
                    //     i18n.t("Message.Backend.NoData")
                    // )
                }
            })
            .catch((error) => {
                reject(error)
                commit(LOGIN_REQUEST_TOKEN_ERROR, error)
            })
    })
}

const mutations = {
    [LOGIN_REQUEST_SENDCODE]: (state) => {
        state.Status = "sending the code requested"
    },
    [LOGIN_REQUEST_SENDCODE_SUCCESS]: (state) => {
        state.Status = "sending the code successfully"
    },
    [LOGIN_REQUEST_SENDCODE_ERROR]: (state, payload) => {
        state.Status = "sending the code failed"
        if (payload && payload.response && payload.response.data && payload.response.data.error) {
            Helpers.notify("is-danger", payload.response.data.error)
        }
        // else Helpers.notify("is-danger", i18n.t("Message.Backend.Default"))
    },
    [LOGIN_REQUEST_TOKEN]: (state) => {
        state.Status = "receiving the token requested"
    },
    [LOGIN_REQUEST_TOKEN_SUCCESS]: (state, payload) => {
        state.Status = "receiving the token successfully"
        try {
            state.Token = `Bearer ${payload.token}`
            state.ExpirationDate = payload.expirationDate
            // const ExpireDate = new Date(state.ExpirationDate).toString()
            // window.$cookies.set("AuthToken", state.Token, ExpireDate)
            // window.$cookies.set("ExpirationDate", state.ExpirationDate, ExpireDate)
            HTTP.defaults.headers.common.Authorization = state.Token
            state.Status = "auth is complete"
        }
        catch (error) {
            state.Status = `auth error: ${error}`
        }
    },
    [LOGIN_REQUEST_TOKEN_ERROR]: (state, payload) => {
        state.Status = "receiving the token failed"
        if (payload && payload.response && payload.response.data && payload.response.data.error) {
            Helpers.notify("is-danger", payload.response.data.error)
        }
        // else Helpers.notify("is-danger", i18n.t("Message.Backend.Default"))
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
