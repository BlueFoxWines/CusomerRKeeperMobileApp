<template>
    <ion-page>
        <ion-header>
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
                    <ul v-if="Order.ProductItems && Order.ProductItems.length > 0">
                        <li>1</li>
                    </ul>
                    <hr>
                    <div class="order-total">
                        <dl>
                            <dt class="bluefox-title">
                                {{ $t("Interface.Order.Total") }}
                            </dt>
                            <dd class="bluefox-title">
                                0 ₽
                            </dd>
                        </dl>
                        <dl>
                            <dt class="bluefox-title">
                                {{ $t("Interface.Order.Payed") }}
                            </dt>
                            <dd class="bluefox-title">
                                0 ₽
                            </dd>
                        </dl>
                    </div>
                    <div v-if="Order.OrderStatus === 0 || Order.OrderStatus === 3" class="order-pay control">
                        <router-link
                            v-if="Order"
                            :to="{ name: 'Pay', params: { id: Order.Id }, query: { booked: !(Order.ProductItems && Order.ProductItems.length > 0) } }"
                            class="button is-theme is-fullwidth"
                        >
                            {{ $t("Interface.Pay.Button") }}
                        </router-link>
                    </div>
                    <p v-if="Order.ProductItems && Order.ProductItems.length === 0 && Order.OrderStatus === 1" class="order-booked">
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
    IonTitle
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
        getOrder() {
            if (
                this.$store.state.Order.List &&
                this.$store.state.Order.List.length > 0 &&
                this.$store.state.Order.List.find(x => parseInt(x.Id, 10) === parseInt(this.$route.params.id, 10))
            ) {
                this.Order = this.$store.state.Order.List.find(x => x.Id === parseInt(this.$route.params.id, 10))
            }
            else {
                this.switchLoading()
                this.$store.dispatch(ORDER_REQUEST, this.$route.params.id)
                    .then((response) => {
                        this.Order = response.data
                    })
                    .finally(() => this.switchLoading())
            }
        },
        filterDateTime(time) {
            return localeDateTime(time)
        }
    }
}
</script>
