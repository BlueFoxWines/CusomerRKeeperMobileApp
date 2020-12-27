const Helpers = {

    notify(type = "is-dark", message = "", duration = 5000, position = "is-top") {
        alert(message)
    },

    checkToken(value) {
        if (window.$cookies.get("ExpirationDate")) {
            const expire = new Date(window.$cookies.get("ExpirationDate"))
            const now = new Date()
            if (now.getTime() < expire.getTime()) {
                if (value === "AuthToken") return window.$cookies.get("AuthToken")
                if (value === "ExpirationDate") return window.$cookies.get("ExpirationDate")
                return null
            }

            window.$cookies.remove("AuthToken")
            window.$cookies.remove("ExpirationDate")
            return null
        }
        return null
    },

    getCurrentLanguage() {
        // if (window.$cookies.isKey("Language") && window.$cookies.get("Language").code) {
        //     return window.$cookies.get("Language").code.substr(0, 2)
        // }
        if (navigator.language) {
            return navigator.language.substr(0, 2)
        }
        return process.env.VUE_APP_I18N_LOCALE
    },

    filterDateTime(date, direction = true) {
        const DefaultDate = new Date(date)
        const UserTimezoneOffset = DefaultDate.getTimezoneOffset() * 60000
        const Result = (direction) ? DefaultDate.getTime() - UserTimezoneOffset : DefaultDate.getTime() + UserTimezoneOffset
        return new Date(Result)
    },

    isObjectEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }

}

export default Helpers
