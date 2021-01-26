<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/main/orders" />
                </ion-buttons>

                <ion-title>
                    <h1 class="bluefox-title title">
                        Бронирование
                    </h1>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
            <div class="container">
                <Form class="form" @submit="book">
                    <Field
                        v-slot="{ field, errors, errorMessage }"
                        v-model="Datetime"
                        name="Datetime"
                        as="div"
                        class="field"
                        type="text"
                    >
                        <ion-item>
                            <ion-label position="stacked" :class="{ 'has-text-danger': Object.keys(errors).length }">
                                <template v-if="Object.keys(errors).length">
                                    {{ errorMessage }}
                                </template>
                                <template v-else>
                                    Выберите дату и время
                                </template>
                            </ion-label>
                            <ion-datetime
                                v-bind="field"
                                :class="{ 'is-danger': Object.keys(errors).length }"
                                display-format="YYYY-MM-DD HH:mm"
                                picker-format="YYYY-MMM-DD HH:mm"
                                :min="MinDate"
                                :max="MaxDate"
                                month-short-names="Янв, Фев, Мар, Апр, Май, Июн, Июл, Авг, Сен, Окт, Ноя, Дек"
                                minute-values="0,15,30,45"
                                hour-values="10,11,12,13,14,15,16,17,18,19,20,21,22,23"
                                cancel-text="Отмена"
                                done-text="Выбрать"
                            />
                        </ion-item>
                    </Field>

                    <div v-if="Datetime && Tables" class="field">
                        <label class="label">Выберите стол</label>
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
                        <button type="submit" class="button is-theme is-fullwidth">
                            Забронировать
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
import { Field, Form } from "vee-validate"
import { notify } from "@/utils/Helpers"
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
        Field,
        Form,
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
    mounted() {
        this.clearData()
    },
    methods: {
        selectTable(id) {
            this.TableNumber = id
        },
        clearData() {
            this.Datetime = null
            this.$store.dispatch(BOOKING_TABLES_CLEAR)
        },
        tablesRequest() {
            if (this.Datetime) {
                this.switchLoading()
                // Datetime normalization to ISO format without timezone
                const Datetime = new Date(this.Datetime).toISOString()
                this.$store.dispatch(BOOKING_TABLES_REQUEST, {
                    "dateTime": Datetime
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
                    "tableCode": this.TableNumber,
                    "dateTime": Datetime
                })
                    .then(() => {
                        this.clearData()
                        notify("is-success", "Успешное бронирование")
                        this.$router.push({ name: "Orders" })
                    })
                    .finally(() => this.switchLoading())
            }
        }
    }
}
</script>
