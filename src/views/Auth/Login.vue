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
                                v-model="Form.Phone"
                                name="Phone"
                                v-slot="{ field, errors, errorMessage }"
                                :rules="validatePhone"
                                :validate-on-input="ValidationPhoneIsEager"
                                as="div"
                                class="field"
                                type="tel"
                            >
                                <label class="label" :class="{ 'has-text-danger': Object.keys(errors).length }">
                                    <template v-if="Object.keys(errors).length">
                                        {{ errorMessage }}
                                    </template>
                                    <template v-else>
                                        {{ $t("Interface.Auth.Login.Phone.Label") }}
                                    </template>
                                </label>
                                <div class="control">
                                    <input
                                        v-bind="field"
                                        v-maska="'+7 (###) ###-##-##'"
                                        @click="setPhoneValue()"
                                        class="input"
                                        :class="{ 'is-danger': Object.keys(errors).length }"
                                        :placeholder="$t('Interface.Auth.Login.Phone.Placeholder')"
                                    />
                                </div>
                            </Field>

                            <div class="control">
                                <button type="submit" class="button is-theme is-fullwidth">
                                    {{ $t("Interface.Auth.Login.Button.Login") }}
                                </button>
                            </div>
                        </Form>
                    </template>
                    <template v-else>
                        <Form class="form mt-5">
                            <Field
                                v-model="Form.Code"
                                name="Code"
                                v-slot="{ field, errors, errorMessage }"
                                :rules="validateCode"
                                :validate-on-input="ValidationCodeIsEager"
                                as="div"
                                class="field"
                                type="numeric"
                            >
                                <label class="label" :class="{ 'has-text-danger': Object.keys(errors).length }">
                                    <template v-if="Object.keys(errors).length">
                                        {{ errorMessage }}
                                    </template>
                                    <template v-else>
                                        {{ $t("Interface.Auth.Login.Code.Label") }}
                                    </template>
                                </label>
                                <div class="control">
                                    <input
                                        v-bind="field"
                                        v-maska="'# # # # # #'"
                                        @input="inputCode()"
                                        class="input"
                                        :class="{ 'is-danger': Object.keys(errors).length }"
                                        style="text-align:center;"
                                        placeholder="• • • • • •"
                                    />
                                </div>
                            </Field>
                            <div class="control">
                                <button @click="resend" type="submit" class="button is-theme is-outlined is-fullwidth" :disabled="!Timeover">
                                    <template v-if="Timeover">
                                        {{ $t("Interface.Auth.Login.Button.ResendCode") }}
                                    </template>
                                    <template v-else>
                                        {{ $t("Interface.Auth.Login.Button.ResendTimer") }} {{ TimeoutBeauty }}
                                    </template>
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
import { Field, Form } from "vee-validate"
import { maska } from "maska"
import LoadingState from "@/mixins/LoadingState"
import Timer from "@/mixins/Timer"
import { notify } from "@/utils/Helpers"
import Validation from "@/utils/Validation"
import { LOGIN_REQUEST_SENDCODE, LOGIN_REQUEST_TOKEN } from "@/store/actions/auth"

export default {
    name: "Login",
    mixins: [LoadingState, Timer],
    components: {
        Field,
        Form
    },
    directives: { maska },
    data() {
        return {
            Form: {
                Phone: null,
                Code: null
            },
            ValidationPhoneIsEager: false,
            ValidationCodeIsEager: false,
            CodeSent: false
        }
    },
    mounted() {
        this.Timeout = 180
        notify("is-danger", "Пример уведомляющего сообщения", 1000)
    },
    methods: {
        setPhoneValue() {
            if (!this.Form.Phone) {
                this.Form.Phone = "+7"
            }
        },
        inputCode() {
            if (this.Form.Code && this.Form.Code.length === 11) {
                this.login()
            }
        },
        validatePhone(value) {
            const result = Validation.validatePhone(value)
            this.ValidationPhoneIsEager = result.eager
            return result.value
        },
        validateCode(value) {
            const result = Validation.validateCode(value)
            this.ValidationCodeIsEager = result.eager
            return result.value
        },
        sendcode() {
            if (this.Form.Phone && this.Form.Phone !== "+7") {
                this.switchLoading()
                // Phone normalization
                const Phone = this.Form.Phone.replace(/[^a-zA-Z0-9 ]|\s+/g, "")
                this.$store.dispatch(LOGIN_REQUEST_SENDCODE, Phone)
                    .then(() => {
                        this.CodeSent = true
                        this.setTimer()
                    })
                    .finally(() => this.switchLoading())
            }
        },
        login() {
            if (this.Form.Phone && this.Form.Code) {
                this.switchLoading()
                // Phone normalization
                const Phone = this.Form.Phone.replace(/[^a-zA-Z0-9 ]|\s+/g, "")
                // Remove spaces and dash from Code
                const Code = this.Form.Code.replace(/-|\s+/g, "")
                this.$store.dispatch(LOGIN_REQUEST_TOKEN, {
                    "Phone": Phone,
                    "Code": Code
                })
                    .then(() => {
                        clearInterval(this.Timer)
                        notify("is-success", "Успешный вход", 1000)
                    })
                    .finally(() => this.switchLoading())
            }
        },
        resend() {
            this.setTimerAgain(180)
            this.sendcode()
        }
    }
}
</script>
