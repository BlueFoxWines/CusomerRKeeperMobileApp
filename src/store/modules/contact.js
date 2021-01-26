import HTTP from "@/http"
import notify from "@/utils/Notifications"
import i18n from "@/i18n"
import {
    CONTACT_FORM_SEND,
    CONTACT_FORM_SEND_SUCCESS,
    CONTACT_FORM_SEND_ERROR
} from "../actions/contact"

const state = {
    Status: null
}

const actions = {
    [CONTACT_FORM_SEND]: ({ commit }, payload) => new Promise((resolve, reject) => {
        commit(CONTACT_FORM_SEND)
        HTTP({
            url: "email/contactformsend",
            method: "POST",
            data: payload
        })
            .then((response) => {
                resolve(response)
                if (response && response.status === 200) {
                    commit(CONTACT_FORM_SEND_SUCCESS, response.data)
                }
                else {
                    notify("danger", i18n.global.t("Message.Backend.NoData"))
                }
            })
            .catch((error) => {
                reject(error)
                commit(CONTACT_FORM_SEND_ERROR, error)
            })
    })
}

const mutations = {
    [CONTACT_FORM_SEND]: (state) => {
        state.Status = "sending the form requested"
    },
    [CONTACT_FORM_SEND_SUCCESS]: (state, payload) => {
        if (payload && payload.message && typeof (payload.message) === "string") {
            notify("warning", payload.message)
            state.Status = "sending the form warning: " + payload.message
        }
        else
            state.Status = "sending the form successfully"
    },
    [CONTACT_FORM_SEND_ERROR]: (state, payload) => {
        state.Status = "sending the form failed"
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
    actions,
    mutations
}
