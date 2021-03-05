import HTTP from "@/http"
import notify from "@/utils/Notifications"
import i18n from "@/i18n"
import {
    PROFILE_LOAD_REQUEST,
    PROFILE_LOAD_REQUEST_SUCCESS,
    PROFILE_LOAD_REQUEST_ERROR,

    PROFILE_EDIT_REQUEST,
    PROFILE_EDIT_REQUEST_SUCCESS,
    PROFILE_EDIT_REQUEST_ERROR
} from "../actions/profile"

const state = {
    Status: null,
    User: null
}

const getters = {
    GET_PROFILE: (state) => {
        return {
            Phone: state.Phone,
            Name: state.Name,
            PictureURL: state.PictureURL
        }
    }
}

const actions = {
    [PROFILE_LOAD_REQUEST]: ({ commit }) => new Promise((resolve, reject) => {
        commit(PROFILE_LOAD_REQUEST)
        HTTP({
            url: "profile",
            method: "GET"
        })
            .then((response) => {
                resolve(response)
                if (response && response.status === 200)
                    commit(PROFILE_LOAD_REQUEST_SUCCESS, response.data)
                else
                    notify("danger", i18n.global.t("Message.Backend.NoData"))
            })
            .catch((error) => {
                reject(error)
                commit(PROFILE_LOAD_REQUEST_ERROR, error)
            })
    }),
    [PROFILE_EDIT_REQUEST]: ({ commit }, payload) => new Promise((resolve, reject) => {
        commit(PROFILE_EDIT_REQUEST)
        HTTP({
            url: "profile",
            method: "POST",
            data: payload
        })
            .then((response) => {
                resolve(response)
                if (response && response.status === 200 && response.data)
                    commit(PROFILE_EDIT_REQUEST_SUCCESS, response.data)
                else
                    notify("danger", i18n.global.t("Message.Backend.NoData"))
            })
            .catch((error) => {
                reject(error)
                commit(PROFILE_EDIT_REQUEST_ERROR, error)
            })
    })
}

const mutations = {
    [PROFILE_LOAD_REQUEST]: (state) => {
        state.Status = "getting the user profile requested"
    },
    [PROFILE_LOAD_REQUEST_SUCCESS]: (state, payload) => {
        if (payload && payload.message && typeof (payload.message) === "string") {
            notify("warning", payload.message)
            state.Status = "getting the user profile warning: " + payload.message
        }
        // TODO: сделать сохранение профиля
        else if (payload && payload.length > 0) {
            state.List = payload
            state.Status = "getting the user profile successfully"
        }
        else {
            state.List = null
            state.Status = "user profile is empty"
        }
    },
    [PROFILE_LOAD_REQUEST_ERROR]: (state, payload) => {
        state.Status = "getting the user profile failed"
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

    [PROFILE_EDIT_REQUEST]: (state) => {
        state.Status = "edit user profile requested"
    },
    [PROFILE_EDIT_REQUEST_SUCCESS]: (state, payload) => {
        if (payload && payload.message && typeof (payload.message) === "string") {
            notify("warning", payload.message)
            state.Status = "edit user profile warning: " + payload.message
        }
        // TODO: сделать обновление данных профиля
        else
            state.Status = "edit user profile successfully"
    },
    [PROFILE_EDIT_REQUEST_ERROR]: (state, payload) => {
        state.Status = "edit user profile failed"
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
