import HTTP from "@/http"
import notify from "@/utils/Notifications"
import i18n from "@/i18n"
import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_REQUEST_SUCCESS,
    ORDER_LIST_REQUEST_ERROR,

    ORDER_REQUEST,
    ORDER_REQUEST_SUCCESS,
    ORDER_REQUEST_ERROR,

    ORDER_PAY_TINKOFFWEB_REQUEST,
    ORDER_PAY_TINKOFFWEB_REQUEST_SUCCESS,
    ORDER_PAY_TINKOFFWEB_REQUEST_ERROR
} from "../actions/order"

const state = {
    Status: null,
    List: []
}

const getters = {
    IS_ORDER_LIST_NOT_EMPTY: (state) => !!(
        state.List
        && typeof state.List !== "undefined"
        && state.List.length > 0
    )
}

const actions = {
    [ORDER_LIST_REQUEST]: ({ commit }) => new Promise((resolve, reject) => {
        commit(ORDER_LIST_REQUEST)
        HTTP({
            url: "order/list",
            method: "GET"
        })
            .then((response) => {
                resolve(response)
                if (response && response.status === 200)
                    commit(ORDER_LIST_REQUEST_SUCCESS, response.data)
                else
                    notify("danger", i18n.global.t("Message.Backend.NoData"))
            })
            .catch((error) => {
                reject(error)
                commit(ORDER_LIST_REQUEST_ERROR, error)
            })
    }),
    [ORDER_REQUEST]: ({ commit }, payload) => new Promise((resolve, reject) => {
        commit(ORDER_REQUEST)
        HTTP({
            url: "order",
            method: "GET",
            params: {
                "OrderId": payload
            }
        })
            .then((response) => {
                resolve(response)
                if (response && response.status === 200 && response.data)
                    commit(ORDER_REQUEST_SUCCESS, response.data)
                else
                    notify("danger", i18n.global.t("Message.Backend.NoData"))
            })
            .catch((error) => {
                reject(error)
                commit(ORDER_REQUEST_ERROR, error)
            })
    }),
    [ORDER_PAY_TINKOFFWEB_REQUEST]: ({ commit }, payload) => new Promise((resolve, reject) => {
        commit(ORDER_PAY_TINKOFFWEB_REQUEST)
        HTTP({
            url: "tinkoff/initpayment",
            method: "POST",
            data: payload
        })
            .then((response) => {
                resolve(response)
                if (response && response.status === 200 && response.data)
                    commit(ORDER_PAY_TINKOFFWEB_REQUEST_SUCCESS, response.data)
                else
                    notify("danger", i18n.global.t("Message.Backend.NoData"))
            })
            .catch((error) => {
                reject(error)
                commit(ORDER_PAY_TINKOFFWEB_REQUEST_ERROR, error)
            })
    })
}

const mutations = {
    [ORDER_LIST_REQUEST]: (state) => {
        state.Status = "getting the orders list requested"
    },
    [ORDER_LIST_REQUEST_SUCCESS]: (state, payload) => {
        if (payload && payload.message && typeof (payload.message) === "string") {
            notify("warning", payload.message)
            state.Status = "getting the orders list warning: " + payload.message
        }
        else if (payload && payload.length > 0) {
            state.List = payload
            state.Status = "getting the orders list successfully"
        }
        else {
            state.List = null
            state.Status = "orders list is empty"
        }
    },
    [ORDER_LIST_REQUEST_ERROR]: (state, payload) => {
        state.Status = "getting the orders list failed"
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

    [ORDER_REQUEST]: (state) => {
        state.Status = "getting the order requested"
    },
    [ORDER_REQUEST_SUCCESS]: (state, payload) => {
        if (payload && payload.message && typeof (payload.message) === "string") {
            notify("warning", payload.message)
            state.Status = "getting the order warning: " + payload.message
        }
        else
            state.Status = "getting the order successfully"
    },
    [ORDER_REQUEST_ERROR]: (state, payload) => {
        state.Status = "getting the order failed"
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

    [ORDER_PAY_TINKOFFWEB_REQUEST]: (state) => {
        state.Status = "getting the tinkoff pay link requested"
    },
    [ORDER_PAY_TINKOFFWEB_REQUEST_SUCCESS]: (state, payload) => {
        if (payload && payload.message && typeof (payload.message) === "string") {
            notify("warning", payload.message)
            state.Status = "getting the tinkoff pay link warning: " + payload.message
        }
        else
            state.Status = "getting the tinkoff pay link successfully"
    },
    [ORDER_PAY_TINKOFFWEB_REQUEST_ERROR]: (state, payload) => {
        state.Status = "getting the tinkoff pay link failed"
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
