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
    })
}

const mutations = {
    [LOGIN_REQUEST_SENDCODE]: (state) => {
        state.Status = "sendcode requested"
    },
    [LOGIN_REQUEST_SENDCODE_SUCCESS]: (state) => {
        state.Status = "sendcode success"
    },
    [LOGIN_REQUEST_SENDCODE_ERROR]: (state, payload) => {
        state.Status = "sendcode error"
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
