<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/main/orders" />
                </ion-buttons>

                <ion-title>
                    <h1 class="bluefox-title title">
                        Оплата
                    </h1>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
            <div class="container">
                <Form class="form mt-5" @submit="pay">
                    <Field
                        v-slot="{ field, errors, errorMessage }"
                        v-model="Form.Summ"
                        name="Summ"
                        :rules="ValidationRule"
                        as="div"
                        class="field"
                        type="number"
                    >
                        <label class="label" :class="{ 'has-text-danger': Object.keys(errors).length }">
                            <template v-if="Object.keys(errors).length">
                                {{ errorMessage }}
                            </template>
                            <template v-else>
                                Сумма к оплате
                            </template>
                        </label>
                        <div class="control">
                            <input
                                v-bind="field"
                                class="input"
                                :class="{ 'is-danger': Object.keys(errors).length }"
                                placeholder="Минимум 2000 рублей"
                            >
                        </div>
                    </Field>

                    <hr>

                    <div class="control">
                        <button type="submit" class="button is-theme is-fullwidth">
                            Оплатить
                        </button>
                    </div>

                    <p class="bluefox-text is-underbutton">
                        Нажимая кнопку "Оплатить" вы соглашаетесь с условиями
                        <router-link
                            :to="{ name: 'Menu' }"
                            class="link"
                        >
                            публичной оферты
                        </router-link>
                    </p>

                    <br>

                    <div class="has-text-centered">
                        <router-link
                            :to="{ name: 'Orders' }"
                            class="button is-text"
                        >
                            Я хочу оплатить заказ в ресторане
                        </router-link>
                    </div>
                </Form>
            </div>
        </ion-content>
        <loading :active="IsLoading" :is-full-page="true" />
    </ion-page>
</template>

<script>
import {
    IonPage,
    IonContent,
    IonButtons,
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonTitle
} from "@ionic/vue"
import { object, number } from "yup"
var yup = { object, number }
import { Field, Form } from "vee-validate"
import notify from "@/utils/Notifications"
import LoadingState from "@/mixins/LoadingState"
import Loading from "@/components/Loading.vue"

export default {
    name: "Pay",
    components: {
        IonContent,
        IonPage,
        IonButtons,
        IonBackButton,
        IonHeader,
        IonToolbar,
        IonTitle,
        Field,
        Form,
        Loading
    },
    mixins: [LoadingState],
    data() {
        return {
            ValidationRule: yup.number().required().min(2000),
            Form: {
                Summ: null,
                Method: null
            }
        }
    },
    methods: {
        pay() {
            notify("dark", "Нажатие кнопки")
        }
    }
}
</script>
