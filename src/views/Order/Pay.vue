<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/main/orders" />
                </ion-buttons>

                <ion-title>
                    <h1 class="bluefox-title title">
                        {{ $t("Interface.Pay.Title") }}
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
                                :disabled="(parseInt($route.query.summ, 10) !== 0)"
                            >
                        </div>
                        <p v-if="parseInt($route.query.summ, 10) === 0" class="suggestamount" @click="fillSuggestedAmount">
                            {{ SuggestedAmount }} ₽
                        </p>
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
                            :to="{ name: 'PublicOffer' }"
                            class="link"
                        >
                            {{ $t("Interface.Pay.OfferLink") }}
                        </router-link>
                    </p>

                    <div v-if="!$route.query.booked" class="has-text-centered">
                        <br>
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
    IonTitle,
    modalController
} from "@ionic/vue"
import { number } from "yup"
var yup = { number }
import { Field, Form } from "vee-validate"
import LoadingState from "@/mixins/LoadingState"
import Loading from "@/components/Loading.vue"
import TinkoffIframeModal from "@/components/TinkoffIframeModal.vue"
import {
    ORDER_PAY_TINKOFFWEB_REQUEST
} from "@/store/actions/order"

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
            ValidationRule: yup.number().required().min(
                (parseInt(this.$route.query.summ, 10) !== 0)
                    ? parseInt(this.$route.query.summ, 10)
                    : 2000
            ),
            PayLink: null,
            SuggestedAmount: 2000,
            Form: {
                Amount: (parseInt(this.$route.query.summ, 10) !== 0)
                    ? parseInt(this.$route.query.summ, 10)
                    : null,
                Method: null
            }
        }
    },
    methods: {
        fillSuggestedAmount() {
            this.Form.Amount = this.SuggestedAmount
        },
        async modalOpen() {
            if (this.PayLink) {
                const modal = await modalController
                    .create({
                        component: TinkoffIframeModal,
                        swipeToClose: true,
                        componentProps: {
                            title: this.$t("Interface.Pay.Method.Card.Tinkoff"),
                            link: this.PayLink
                        }
                    })
                return modal.present()
            }
        },
        async modalClose() {
            const modal = await modalController
            return modal.dismiss()
        },
        pay() {
            this.switchLoading()
            this.$store.dispatch(ORDER_PAY_TINKOFFWEB_REQUEST, {
                "OrderId": parseInt(this.$route.params.id, 10),
                "Sum": parseInt(this.Form.Amount, 10)
            })
                .then((response) => {
                    this.PayLink = response.data.PaymentURL
                    this.modalOpen()
                })
                .finally(() => this.switchLoading())
        }
    }
}
</script>
