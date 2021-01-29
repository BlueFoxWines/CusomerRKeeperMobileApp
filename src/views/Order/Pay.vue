<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/main/orders" />
                </ion-buttons>

                <ion-title>
                    <h1 class="bluefox-title title">
                        {{ $t("Interface.Pay.Amount.Title") }}
                    </h1>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
            <div class="container">
                <Form class="form mt-5" @submit="pay">
                    <Field
                        v-slot="{ field, errors, errorMessage }"
                        v-model="Form.Amount"
                        name="Amount"
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
                                {{ $t("Interface.Pay.Amount.Label") }}
                            </template>
                        </label>
                        <div class="control">
                            <input
                                v-bind="field"
                                class="input"
                                :class="{ 'is-danger': Object.keys(errors).length }"
                                :placeholder="$t('Interface.Pay.Amount.Placeholder')"
                            >
                        </div>
                    </Field>

                    <hr>

                    <div class="control">
                        <button type="submit" class="button is-theme is-fullwidth">
                            {{ $t("Interface.Pay.Button") }}
                        </button>
                    </div>

                    <p class="bluefox-text is-underbutton">
                        {{ $t("Interface.Pay.OfferText") }}
                        <router-link
                            :to="{ name: 'Menu' }"
                            class="link"
                        >
                            {{ $t("Interface.Pay.OfferLink") }}
                        </router-link>
                    </p>

                    <br>

                    <div class="has-text-centered">
                        <router-link
                            :to="{ name: 'Orders' }"
                            class="button is-text"
                        >
                            {{ $t("Interface.Pay.PayAtRestaurant") }}
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
                Amount: null,
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
