<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <section class="hero is-fullheight">
                <div class="hero-body">
                    <div class="container">
                        <div class="columns is-flex is-centered">
                            <figure class="logo image">
                                <img src="assets/logo/logo_full_bright.svg">
                            </figure>
                        </div>
                        <transition name="fade" mode="out-in">
                            <template v-if="!CodeSent">
                                <Form class="form mt-5" @submit="sendcode">
                                    <Field
                                        v-slot="{ field, errors, errorMessage }"
                                        v-model="Form.Phone"
                                        name="Phone"
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
                                                v-maska="'+7 (###) ###-##-##'"
                                                v-bind="field"
                                                class="input"
                                                :class="{ 'is-danger': Object.keys(errors).length }"
                                                :placeholder="$t('Interface.Auth.Login.Phone.Placeholder')"
                                                @click="setPhoneValue()"
                                            >
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
                                        v-slot="{ field, errors, errorMessage }"
                                        v-model="Form.Code"
                                        name="Code"
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
                                                v-maska="'# # # # # #'"
                                                v-bind="field"
                                                class="input"
                                                :class="{ 'is-danger': Object.keys(errors).length }"
                                                style="text-align:center;"
                                                placeholder="• • • • • •"
                                                autofocus
                                                @input="inputCode()"
                                            >
                                        </div>
                                    </Field>
                                    <div class="control">
                                        <button type="submit" class="button is-theme is-outlined is-fullwidth" :disabled="!Timeover" @click="resend">
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
        </ion-content>
        <loading :active="IsLoading" :is-full-page="true" />
    </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue"
import { Field, Form } from "vee-validate"
import { maska } from "maska"
import LoadingState from "@/mixins/LoadingState"
import Timer from "@/mixins/Timer"
import Validation from "@/utils/Validation"
import Loading from "@/components/Loading.vue"
import {
    LOGIN_REQUEST_SENDCODE,
    LOGIN_REQUEST_TOKEN
} from "@/store/actions/auth"

export default {
    name: "Login",
    components: {
        IonContent,
        IonPage,
        Field,
        Form,
        Loading
    },
    directives: { maska },
    mixins: [LoadingState, Timer],
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
                        this.$router.replace(this.$route.query.redirect || "/")
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
