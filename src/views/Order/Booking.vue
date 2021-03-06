<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/main/orders" />
                </ion-buttons>

                <ion-title>
                    <h1 class="bluefox-title title">
                        {{ $t("Interface.Booking.Title") }}
                    </h1>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
            <div class="container">
                <form class="form" @submit.prevent="book">
                    <div class="field">
                        <ion-item>
                            <ion-label position="stacked">
                                {{ $t("Interface.Booking.Datetime.Label") }}
                            </ion-label>
                            <ion-datetime
                                v-model="Datetime"
                                name="Datetime"
                                display-format="YYYY-MM-DD HH:mm"
                                picker-format="YYYY-MMM-DD HH:mm"
                                :picker-options="{ cssClass: 'datetime' }"
                                :min="MinDate"
                                :max="MaxDate"
                                month-short-names="Янв, Фев, Мар, Апр, Май, Июн, Июл, Авг, Сен, Окт, Ноя, Дек"
                                minute-values="0,15,30,45"
                                hour-values="10,11,12,13,14,15,16,17,18,19,20,21,22,23"
                                :cancel-text="$t('Interface.Booking.Datetime.Cancel')"
                                :done-text="$t('Interface.Booking.Datetime.Choose')"
                            />
                        </ion-item>
                    </div>

                    <div v-if="Datetime && Tables" class="field">
                        <label class="label">{{ $t("Interface.Booking.Table.Label") }}</label>
                        <div class="control">
                            <table-map
                                :selected="TableNumber"
                                :tables="Tables"
                                :disabled="!Tables"
                                @select-table="selectTable"
                            />
                        </div>
                    </div>


                    <hr>

                    <div class="control">
                        <button
                            :disabled="!(Datetime && TableNumber)"
                            type="submit"
                            class="button is-theme is-fullwidth"
                        >
                            {{ $t("Interface.Booking.Button") }}
                        </button>
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
    IonDatetime,
    IonItem,
    IonLabel
} from "@ionic/vue"
import LoadingState from "@/mixins/LoadingState"
import TableMap from "@/components/TableMap.vue"
import Loading from "@/components/Loading.vue"
import {
    BOOKING_TABLES_CLEAR,
    BOOKING_TABLES_REQUEST,
    BOOKING_BOOK_REQUEST
} from "@/store/actions/booking"

export default {
    name: "Booking",
    components: {
        IonContent,
        IonPage,
        IonButtons,
        IonBackButton,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonDatetime,
        IonItem,
        IonLabel,
        TableMap,
        Loading
    },
    mixins: [LoadingState],
    setup () {
        Date.prototype.addHours = function(h) {
            this.setTime(this.getTime() + (h*60*60*1000))
            return this
        }

        let MinDate = new Date().addHours(0.25)
        MinDate.setTime( MinDate.getTime() - MinDate.getTimezoneOffset() * 60000)
        MinDate = MinDate.toISOString()

        let MaxDate = new Date()
        MaxDate.setMonth(MaxDate.getMonth() + 6)
        MaxDate = MaxDate.toISOString()

        return {
            MinDate,
            MaxDate
        }
    },
    data() {
        return {
            Datetime: null,
            TableNumber: null
        }
    },
    computed: {
        Tables() {
            return this.$store.state.Booking.Tables
        }
    },
    watch: {
        Datetime() {
            this.tablesRequest()
        }
    },
    ionViewWillEnter() {
        this.clearData()
    },
    methods: {
        selectTable(id) {
            this.TableNumber = id
        },
        clearData() {
            this.Datetime = null
            this.TableNumber = null
            this.$store.dispatch(BOOKING_TABLES_CLEAR)
        },
        tablesRequest() {
            if (this.Datetime) {
                this.switchLoading()
                // Datetime normalization to ISO format without timezone
                const Datetime = new Date(this.Datetime).toISOString()
                this.$store.dispatch(BOOKING_TABLES_REQUEST, {
                    "Datetime": Datetime
                })
                    .finally(() => this.switchLoading())
            }
        },
        book() {
            if (this.Datetime && this.TableNumber) {
                this.switchLoading()
                // Datetime normalization to ISO format without timezone
                const Datetime = new Date(this.Datetime).toISOString()
                this.$store.dispatch(BOOKING_BOOK_REQUEST, {
                    "TableCode": this.TableNumber,
                    "Datetime": Datetime
                })
                    .then((response) => {
                        this.clearData()
                        this.$router.push({
                            name: "Pay",
                            params: { id: response.data.Id },
                            query: { booked: true, summ: 0 }
                        })
                    })
                    .finally(() => this.switchLoading())
            }
        }
    }
}
</script>
