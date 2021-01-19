import parsePhoneNumber from "libphonenumber-js/mobile"
import i18n from "@/i18n"
import { setLocale } from "yup"

setLocale({
    mixed: {
        required: i18n.global.t("Validation.Required")
    },
    string: {
        min: ({ min }) => (i18n.global.tc("Validation.MinLength", min, { min: min })),
        email: i18n.global.t("Validation.Email")
    }
})

const Validation = new Object()

Validation.validatePhone = function (value) {
    if (value === "+7") return {   // for prevent validation error when user click on input
        value: true,
        eager: false
    }
    if (!value) return {   // if the field is empty
        value: i18n.global.t("Validation.Required"),
        eager: true
    }
    const phoneNumber = parsePhoneNumber(value, "RU")
    if (phoneNumber) {   // check field with libphonenumber-js
        if (phoneNumber.isValid() !== true) return {
            value: i18n.global.t("Validation.Phone"),
            eager: true
        }
    }
    else return { value: i18n.global.t("Validation.Phone") }

    // All is good
    return {
        value: true,
        eager: false
    }
}

Validation.validateCode = function (value) {
    if (!value) return {   // if the field is empty
        value: i18n.global.t("Validation.Required"),
        eager: true
    }

    if (value && (value.length < 11 || value.length > 11)) return {
        value: i18n.global.t("Validation.Exact"),
        eager: true
    }

    // All is good
    return {
        value: true,
        eager: false
    }
}

export default Validation
