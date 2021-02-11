<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar>
                <ion-title>
                    <h1 class="bluefox-title title">
                        {{ $t("Interface.Order.Title") }}
                    </h1>
                </ion-title>

                <ion-buttons v-if="IsAuthenticated && IsOrdersExist" slot="primary">
                    <router-link
                        :to="{ name: 'Booking' }"
                    >
                        <ion-button>
                            <ion-icon slot="icon-only" src="assets/icon_cart.svg" />
                        </ion-button>
                    </router-link>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding" :scroll-events="true" @ionScroll="logScrolling($event)">
            <div class="container has-text-centered">
                <p class="bluefox-text">
                    <template v-if="!IsAuthenticated && !IsOrdersExist">
                        {{ $t("Interface.Order.NotAuthenticated") }}
                        <router-link :to="{ name: 'Login', query: { redirect: $route.path } }">
                            {{ $t("Interface.Order.NotAuthenticatedLink") }}
                        </router-link>
                    </template>
                    <template v-else-if="IsAuthenticated && !IsOrdersExist">
                        {{ $t("Interface.Order.Empty") }}
                    </template>
                </p>
                <ul v-if="IsOrdersExist" class="orderslist">
                    <li v-for="Order in Orders" :key="Order.Id">
                        <router-link :to="{ name: 'Order', params: { id: Order.Id } }" class="orderslist-item columns is-multiline is-mobile">
                            <div class="column">
                                <div class="columns is-mobile">
                                    <div class="orderslist-item-title column">
                                        <template v-if="isFutureDateTime(Order.StartDate)">
                                            {{ $t("Interface.Order.DateTitle.Future") }}
                                        </template>
                                        <template v-else>
                                            {{ $t("Interface.Order.DateTitle.Past") }}
                                        </template>
                                        {{ filterDateTime(Order.StartDate) }}
                                    </div>
                                    <div
                                        class="orderslist-item-status column is-4"
                                        :class="{
                                            'is-notpayed': Order.OrderStatus === 0,
                                            'is-payed': Order.OrderStatus === 2,
                                            'is-closed': Order.OrderStatus === 4
                                        }"
                                    >
                                        {{ $t('Interface.Order.Status.' + Order.OrderStatus) }}
                                    </div>
                                </div>
                                <div class="orderslist-item-preview column is-half">
                                    <template v-if="Order.ProductItems && Order.ProductItems.length > 0">
                                        {{ Order.ProductItems }}
                                    </template>
                                    <template v-else>
                                        {{ $t("Interface.Order.Product.Booked") }}
                                    </template>
                                </div>
                            </div>
                            <div class="orderslist-item-arrow column is-1">
                                <ion-icon src="assets/icon_arrow_right.svg" />
                            </div>
                        </router-link>
                    </li>
                </ul>
                <div v-if="!IsOrdersExist" class="control">
                    <hr>
                    <!-- <router-link
                        :to="{ name: 'Menu' }"
                        class="button is-theme is-fullwidth"
                    >
                        {{ $t("Interface.Order.Preorder") }}
                    </router-link>
                    <br> -->
                    <router-link
                        :to="{ name: 'Booking' }"
                        class="button is-theme is-outlined is-fullwidth"
                    >
                        {{ $t("Interface.Order.Book") }}
                    </router-link>
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
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon
} from "@ionic/vue"
import { localeDateTime } from "@/utils/Helpers"
import LoadingState from "@/mixins/LoadingState"
import Loading from "@/components/Loading.vue"
import {
    ORDER_LIST_REQUEST
} from "@/store/actions/order"

export default {
    name: "Orders",
    components: {
        IonContent,
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonIcon,
        Loading
    },
    mixins: [LoadingState],
    computed: {
        IsAuthenticated() {
            return this.$store.getters.IS_AUTHENTICATED
        },
        IsOrdersExist() {
            return this.$store.getters.IS_ORDER_LIST_NOT_EMPTY
        },
        Orders() {
            return this.$store.state.Order.List
        }
    },
    ionViewWillEnter() {
        this.getOrders()
    },
    methods: {
        getOrders() {
            if (this.IsAuthenticated) {
                this.switchLoading()
                this.$store.dispatch(ORDER_LIST_REQUEST)
                    .finally(() => this.switchLoading())
            }
        },
        isFutureDateTime(datetime) {
            return (new Date(datetime) > new Date())
        },
        filterDateTime(time) {
            return localeDateTime(time)
        }
    }
}
</script>
