import HTTP from "@/http"
import notify from "@/utils/Notifications"
import i18n from "@/i18n"
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
                if (response && response.status === 200) {
                    commit(LOGIN_REQUEST_SENDCODE_SUCCESS, response.data)
                }
                else {
                    notify("danger", i18n.global.t("Message.Backend.NoData"))
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
                if (response && response.status === 200) {
                    commit(LOGIN_REQUEST_TOKEN_SUCCESS, response.data)
                }
                else {
                    notify("danger", i18n.global.t("Message.Backend.NoData"))
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
    [LOGIN_REQUEST_SENDCODE_SUCCESS]: (state, payload) => {
        if (payload && payload.message && typeof (payload.message) === "string") {
            notify("warning", payload.message)
            state.Status = "sending the code warning: " + payload.message
        }
        else
            state.Status = "sending the code successfully"
    },
    [LOGIN_REQUEST_SENDCODE_ERROR]: (state, payload) => {
        state.Status = "sending the code failed"
        if (
            payload &&
            payload.response &&
            payload.response.status &&
            (payload.response.status > 299 && payload.response.status < 500) &&
            payload.response.data &&
            payload.response.data.error &&
            typeof (payload.response.data.error) === "string"
        ) {
            notify("danger", payload.response.data.error)
        }
        else notify("danger", i18n.global.t("Message.Backend.Default"))
    },
    [LOGIN_REQUEST_TOKEN]: (state) => {
        state.Status = "receiving the token requested"
    },
    [LOGIN_REQUEST_TOKEN_SUCCESS]: (state, payload) => {
        if (payload && payload.message && typeof (payload.message) === "string") {
            notify("warning", payload.message)
            state.Status = "receiving the token warning: " + payload.message
        }
        else {
            state.Status = "receiving the token successfully"
            try {
                state.Token = `Bearer ${payload.token}`
                state.ExpirationDate = payload.expirationDate
                HTTP.defaults.headers.common.Authorization = state.Token
                state.Status = "auth is complete"
            }
            catch (error) {
                state.Status = `auth error: ${error}`
            }
        }
    },
    [LOGIN_REQUEST_TOKEN_ERROR]: (state, payload) => {
        state.Status = "receiving the token failed"
        if (
            payload &&
            payload.response &&
            payload.response.status &&
            (payload.response.status > 299 && payload.response.status < 500) &&
            payload.response.data &&
            payload.response.data.error &&
            typeof (payload.response.data.error) === "string"
        ) {
            notify("danger", payload.response.data.error)
        }
        else notify("danger", i18n.global.t("Message.Backend.Default"))
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
