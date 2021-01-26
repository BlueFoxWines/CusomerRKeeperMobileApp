import HTTP from "@/http"
import { notify } from "@/utils/Helpers"
import i18n from "@/i18n"
import {
    BOOKING_TABLES_CLEAR,

    BOOKING_TABLES_REQUEST,
    BOOKING_TABLES_REQUEST_SUCCESS,
    BOOKING_TABLES_REQUEST_ERROR,

    BOOKING_BOOK_REQUEST,
    BOOKING_BOOK_REQUEST_SUCCESS,
    BOOKING_BOOK_REQUEST_ERROR
} from "../actions/booking"

const state = {
    Status: null,
    Datetime: null,
    Tables: null
}

const actions = {
    [BOOKING_TABLES_CLEAR]: ({ commit }) => new Promise(() => {
        commit(BOOKING_TABLES_CLEAR)
    }),

    [BOOKING_TABLES_REQUEST]: ({ commit }, payload) => new Promise((resolve, reject) => {
        commit(BOOKING_TABLES_REQUEST)
        HTTP({
            url: "book/tables",
            method: "GET",
            params: payload
        })
            .then((response) => {
                resolve(response)
                if (response && response.status === 200 && response.data) {
                    const Payload = {
                        Datetime: payload.dateTime,
                        Tables: response.data
                    }
                    commit(BOOKING_TABLES_REQUEST_SUCCESS, Payload)
                }
                else {
                    notify("is-danger", i18n.global.t("Message.Backend.NoData"))
                }
            })
            .catch((error) => {
                console.log(error)
                reject(error)
                commit(BOOKING_TABLES_REQUEST_ERROR, error)
            })
    }),

    [BOOKING_BOOK_REQUEST]: ({ commit }, payload) => new Promise((resolve, reject) => {
        commit(BOOKING_BOOK_REQUEST)
        HTTP({
            url: "book",
            method: "POST",
            data: payload
        })
            .then((response) => {
                resolve(response)
                if (response && response.status === 200) {
                    commit(BOOKING_BOOK_REQUEST_SUCCESS)
                }
                else {
                    notify("is-danger", i18n.global.t("Message.Backend.NoData"))
                }
            })
            .catch((error) => {
                console.log(error)
                reject(error)
                commit(BOOKING_BOOK_REQUEST_ERROR, error)
            })
    })
}

const mutations = {
    [BOOKING_TABLES_CLEAR]: (state) => {
        state.Datetime = null
        state.Tables = null
        state.Status = "tables cleared"
    },

    [BOOKING_TABLES_REQUEST]: (state) => {
        state.Status = "sending the tables requested"
    },
    [BOOKING_TABLES_REQUEST_SUCCESS]: (state, payload) => {
        if (payload && payload.message && typeof (payload.message) === "string") {
            notify("is-warning", payload.message)
            state.Status = "sending the tables warning: " + payload.message
        }
        else
            state.Status = "sending the tables successfully"
        state.Datetime = payload.Datetime
        state.Tables = payload.Tables
    },
    [BOOKING_TABLES_REQUEST_ERROR]: (state, payload) => {
        state.Status = "sending the tables failed"
        if (
            payload &&
            payload.response &&
            payload.response.status &&
            (payload.response.status > 299 && payload.response.status < 500) &&
            payload.response.data &&
            payload.response.data.error &&
            typeof (payload.response.data.error) === "string"
        ) {
            notify("is-danger", payload.response.data.error)
        }
        else notify("is-danger", i18n.global.t("Message.Backend.Default"))
    },

    [BOOKING_BOOK_REQUEST]: (state) => {
        state.Status = "sending the tables requested"
    },
    [BOOKING_BOOK_REQUEST_SUCCESS]: (state, payload) => {
        if (payload && payload.message && typeof (payload.message) === "string") {
            notify("is-warning", payload.message)
            state.Status = "sending the tables warning: " + payload.message
        }
        else
            state.Status = "sending the tables successfully"
    },
    [BOOKING_BOOK_REQUEST_ERROR]: (state, payload) => {
        state.Status = "sending the tables failed"
        if (
            payload &&
            payload.response &&
            payload.response.status &&
            (payload.response.status > 299 && payload.response.status < 500) &&
            payload.response.data &&
            payload.response.data.error &&
            typeof (payload.response.data.error) === "string"
        ) {
            notify("is-danger", payload.response.data.error)
        }
        else notify("is-danger", i18n.global.t("Message.Backend.Default"))
    }
}

export default {
    state,
    actions,
    mutations
}