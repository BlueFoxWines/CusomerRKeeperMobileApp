<template>
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-flex is-centered">
                    <figure class="image is-128x128">
                        <img class="is-rounded" src="https://bulma.io/images/placeholders/256x256.png">
                    </figure>
                </div>
                <Form class="form mt-5">
                    <transition name="fade" mode="out-in">
                        <template v-if="!CodeSent">
                            <div class="field">
                                <label class="label">Введите ваш номер телефона</label>
                                <div class="control">
                                    <Field
                                        v-model="Phone"
                                        as="input"
                                        name="Phone"
                                        class="input"
                                        type="text"
                                        placeholder="Номер телефона"
                                        :rules="validatePhoneNumber"
                                        v-maska="'+7 (###) ###-##-##'"
                                    />
                                    <ErrorMessage name="Phone" />
                                </div>
                            </div>
                        </template>
                        <template v-else>
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
                                    />
                                </div>
                            </div>
                        </template>
                    </transition>
                    <div class="control">
                        <button
                            v-if="!CodeSent"
                            type="submit"
                            @click.prevent="sendcode()"
                            class="button is-theme is-fullwidth"
                        >
                            Получить код
                        </button>
                        <button
                            v-else
                            type="submit"
                            @click.prevent="login()"
                            class="button is-theme is-fullwidth"
                        >
                            Войти
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </section>
</template>

<script>
import { maska } from "maska"
import parsePhoneNumber from "libphonenumber-js"
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
            Phone: null,
            Code: null,
            CodeSent: false
        }
    },
    methods: {
        validatePhoneNumber(value) {
            // if the field is empty
            if (!value) {
                return "This field is required"
            }

            // check field with libphonenumber-js
            if (!parsePhoneNumber(value, "RU").isValid()) {
                return "This field must be a valid phone number"
            }

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
