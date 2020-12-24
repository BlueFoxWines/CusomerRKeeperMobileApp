<template>
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-flex is-centered">
                    <figure class="image is-128x128">
                        <img class="is-rounded" src="https://bulma.io/images/placeholders/256x256.png">
                    </figure>
                </div>
                <transition name="fade" mode="out-in">
                    <template v-if="!CodeSent">
                        <Form @submit="sendcode" class="form mt-5">
                            <Field
                                as="div"
                                name="Phone"
                                v-model="Phone"
                                class="field"
                                type="text"
                                :rules="validatePhoneNumber"
                                v-slot="{ field, meta, errors, errorMessage }"
                            >
                                <label class="label" :class="{ 'has-text-danger': errors[0], 'has-text-success': meta.valid }">
                                    <template v-if="errors[0]">
                                        {{ errorMessage }}
                                    </template>
                                    <template v-else>
                                        Введите ваш номер телефона
                                    </template>
                                </label>
                                <div class="control">
                                    <input
                                        v-bind="field"
                                        placeholder="Номер телефона"
                                        v-maska="'+7 (###) ###-##-##'"
                                        class="input"
                                        :class="{ 'is-danger': errors[0], 'is-success': meta.valid }"
                                    />
                                </div>
                            </Field>

                            <div class="control">
                                <button type="submit" class="button is-theme is-fullwidth">
                                    Получить код
                                </button>
                            </div>
                        </Form>
                    </template>
                    <template v-else>
                        <Form @submit="login" class="form mt-5">
                            <div class="field">
                                <label class="label">Введите код</label>
                                <div class="control">
                                    <Field
                                        v-model="Code"
                                        as="input"
                                        name="Code"
                                        class="input"
                                        type="text"
                                        placeholder="Код"
                                        :rules="CodeRules"
                                    />
                                    <ErrorMessage name="Code" />
                                </div>
                            </div>
                            <div class="control">
                                <button type="submit" class="button is-theme is-fullwidth">
                                    Войти
                                </button>
                            </div>
                        </Form>
                    </template>
                </transition>
            </div>
        </div>
    </section>
</template>

<script>
import { markRaw } from "vue"
import { maska } from "maska"
import parsePhoneNumber from "libphonenumber-js"
import { string } from "yup"
import { Form, Field, ErrorMessage } from "vee-validate"
import { LOGIN_REQUEST_SENDCODE, LOGIN_REQUEST_TOKEN } from "@/store/actions/auth"

export default {
    name: "Login",
    directives: { maska },
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        return {
            Phone: "+7",
            Code: null,
            CodeSent: false,
            CodeRules: markRaw(string()
                .required()
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(6, "Must be exactly 6 digits")
                .max(6, "Must be exactly 6 digits")
            )
        }
    },
    methods: {
        validatePhoneNumber(value) {
            // if the field is empty
            if (!value) {
                return "This field is required"
            }

            // check field with libphonenumber-js
            const phoneNumber = parsePhoneNumber(value, "RU")
            if (phoneNumber) {
                if (phoneNumber.isValid() !== true)
                    return "This field must be a valid phone number"
            }
            else return "This field must be a valid phone number"

            // All is good
            return true
        },
        sendcode() {
            this.$store.dispatch(LOGIN_REQUEST_SENDCODE, this.Phone)
                .then(() => {
                    this.CodeSent = !this.CodeSent
                })
                // .finally(() => this.switchLoading())
        },
        login() {
            this.$store.dispatch(LOGIN_REQUEST_TOKEN, {
                Phone: this.Phone,
                Code: this.Code
            })
                .then(() => {
                    alert("Success")
                })
                // .finally(() => this.switchLoading())
        }
    }
}
</script>
