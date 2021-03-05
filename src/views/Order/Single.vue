<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/main/orders" />
                </ion-buttons>

                <ion-title>
                    <h1 class="bluefox-title title">
                        {{ $t("Interface.Order.TitleSingle") }}
                    </h1>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
            <ion-refresher slot="fixed" @ionRefresh="getOrder($event)">
                <ion-refresher-content />
            </ion-refresher>
            <div class="container">
                <div v-if="Order" class="order">
                    <p
                        class="order-status"
                        :class="{
                            'is-notpayed': Order.OrderStatus === 0,
                            'is-payed': Order.OrderStatus === 2,
                            'is-closed': Order.OrderStatus === 4
                        }"
                    >
                        {{ $t('Interface.Order.Status.' + Order.OrderStatus) }}
                    </p>
                    <ul v-if="Order.ProductItems && Order.ProductItems.length > 0" class="order-products">
                        <li v-for="Product in Order.ProductItems" :key="Product.Id" class="order-product columns is-gapless is-mobile">
                            <div class="order-product-image column">
                                <div class="order-product-image-bg" />
                                <figure class="order-product-image-pic">
                                    <img src="assets/domini.png">
                                </figure>
                            </div>
                            <div class="order-product-title column">
                                <p class="order-product-title-name">{{ Product.Name }}</p>
                                <p class="order-product-title-desc">
                                    0.75 л, Франция
                                </p>
                                <p class="order-product-title-desc">
                                    Cabernet sovingion
                                </p>
                            </div>
                            <div class="order-product-total column is-2">
                                <p class="order-product-amount">x{{ Product.Quantity }}</p>
                                <p class="order-product-price">{{ Product.Price }} ₽</p>
                            </div>
                        </li>
                    </ul>
                    <hr>
                    <div class="order-total">
                        <dl>
                            <dt class="bluefox-title">
                                {{ $t("Interface.Order.Total") }}
                            </dt>
                            <dd class="bluefox-title">
                                {{ Order.Price }} ₽
                            </dd>
                        </dl>
                        <dl>
                            <dt class="bluefox-title">
                                {{ $t("Interface.Order.Payed") }}
                            </dt>
                            <dd class="bluefox-title">
                                {{ Order.Paid }} ₽
                            </dd>
                        </dl>
                    </div>
                    <div v-if="Order.OrderStatus === 0 || Order.OrderStatus === 3" class="order-pay control">
                        <router-link
                            v-if="Order"
                            :to="{
                                name: 'Pay',
                                params: { id: Order.Id },
                                query: {
                                    booked: !(Order.ProductItems && Order.ProductItems.length > 0),
                                    summ: parseInt(Order.Price, 10) - parseInt(Order.Paid, 10)
                                }
                            }"
                            class="button is-theme is-fullwidth"
                        >
                            {{ $t("Interface.Pay.Button") }}
                        </router-link>
                    </div>
                    <p v-if="Order.OrderStatus === 1" class="order-booked">
                        {{ $tc("Interface.Order.BookInfoPayed", 7, { table: getTableCode(Order.TableCode), date: filterDateTime(Order.StartDate) }) }}
                    </p>
                    <p v-else class="order-booked">
                        {{ $tc("Interface.Order.BookInfo", 7, { table: getTableCode(Order.TableCode), date: filterDateTime(Order.StartDate) }) }}
                    </p>
                </div>
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
    IonRefresher,
    IonRefresherContent
} from "@ionic/vue"
import { localeDateTime } from "@/utils/Helpers"
import LoadingState from "@/mixins/LoadingState"
import Loading from "@/components/Loading.vue"
import {
    ORDER_REQUEST
} from "@/store/actions/order"

export default {
    name: "Order",
    components: {
        IonContent,
        IonPage,
        IonButtons,
        IonBackButton,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonRefresher,
        IonRefresherContent,
        Loading
    },
    mixins: [LoadingState],
    data() {
        return {
            Order: null
        }
    },
    mounted() {
        this.getOrder()
    },
    methods: {
        getTableCode(value) {
            value = parseInt(value, 10)
            if (value < 7)
                return value
            else
                return "VIP " + (value - 6)
        },
        getOrder(event) {
            this.switchLoading()
            this.$store.dispatch(ORDER_REQUEST, this.$route.params.id)
                .then((response) => {
                    this.Order = response.data
                    if (event)
                        event.target.complete()
                })
                .finally(() => this.switchLoading())
        },
        filterDateTime(time) {
            return localeDateTime(time)
        }
    }
}
</script>

<style scoped>
    ion-content.ion-padding {
        --padding-top: var(--ion-padding, 1px);
    }
</style>
