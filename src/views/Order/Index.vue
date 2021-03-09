<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar>
                <ion-title>
                    <h1 class="bluefox-title title">
                        {{ $t("Interface.Order.Title") }}
                    </h1>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
            <ion-refresher slot="fixed" @ionRefresh="getOrders($event)">
                <ion-refresher-content />
            </ion-refresher>
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
                <div v-if="IsOrdersExist" class="control">
                    <router-link
                        :to="{ name: 'Booking' }"
                        class="button is-theme is-outlined is-fullwidth"
                    >
                        {{ $t("Interface.Order.Book") }}
                    </router-link>
                    <br>
                </div>
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
                                    <template v-if="Order.Products && Order.Products.length > 0">
                                        {{ Order.Products }}
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
                <div class="control">
                    <hr>
                    <router-link
                        :to="{ name: 'Menu' }"
                        class="button is-theme is-fullwidth"
                    >
                        {{ $t("Interface.Order.Preorder") }}
                    </router-link>
                    <br>
                    <router-link
                        v-if="!IsOrdersExist"
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
    IonIcon,
    IonRefresher,
    IonRefresherContent
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
        IonRefresher,
        IonRefresherContent,
        Loading
    },
    mixins: [LoadingState],
    data() {
        return {
            FirstUsage: true
        }
    },
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
        getOrders(event) {
            if (this.IsAuthenticated && this.isRefreshAllowed(event)) {
                if (!event) this.switchLoading()
                this.$store.dispatch(ORDER_LIST_REQUEST)
                    .then(() => {
                        this.FirstUsage = false
                        if (event)
                            event.target.complete()
                    })
                    .finally(() => {
                        if (!event) this.switchLoading()
                    })
            }
        },
        isRefreshAllowed(event) {
            if (event)
                return true
            if (this.$route.params.refresh)
                return true
            if (this.FirstUsage)
                return true
            else
                return false
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
