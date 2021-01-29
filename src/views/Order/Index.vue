<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    <h1 class="bluefox-title title">
                        {{ $t("Interface.Order.Title") }}
                    </h1>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
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
                        <router-link :to="{ name: 'Menu' }" class="orderslist-item columns is-multiline is-mobile">
                            <div class="column">
                                <dvi class="columns is-mobile">
                                    <div class="orderslist-item-title column">
                                        <template v-if="isFutureDateTime(Order.StartDate)">
                                            {{ $t("Interface.Order.DateTitle.Future") }}
                                        </template>
                                        <template v-else>
                                            {{ $t("Interface.Order.DateTitle.Past") }}
                                        </template>
                                        {{ filterDateTime(Order.StartDate) }}
                                    </div>
                                    <div class="orderslist-item-status column is-3">
                                        {{ $t('Interface.Order.Status.' + Order.OrderStatus) }}
                                    </div>
                                </dvi>
                                <div class="orderslist-item-preview column is-half">
                                    Val di Toro, Чайный набор “Провансаль”, Бокал “Л...
                                </div>
                            </div>
                            <div class="orderslist-item-arrow column is-1">
                                <ion-icon src="assets/icon_arrow_right.svg" />
                            </div>
                        </router-link>
                    </li>
                </ul>
                <hr>
                <div class="control">
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
    mounted() {
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
            var options = {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                timezone: "UTC",
                hour: "numeric",
                minute: "numeric"
            }
            return new Date(time).toLocaleString("ru", options)
        }
    }
}
</script>
