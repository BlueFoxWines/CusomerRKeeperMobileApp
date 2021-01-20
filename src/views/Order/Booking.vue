<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button icon="assets/icon_back.svg" text="" default-href="/main/orders" />
                </ion-buttons>

                <ion-title>
                    <h1 class="bluefox-title title">
                        Бронирование
                    </h1>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
            <Form class="form" @submit="sendform">
                <Field
                    v-slot="{ field, errors, errorMessage }"
                    v-model="Form.Datetime"
                    name="Name"
                    as="div"
                    class="field"
                    type="text"
                >
                    <label class="label" :class="{ 'has-text-danger': Object.keys(errors).length }">
                        <template v-if="Object.keys(errors).length">
                            {{ errorMessage }}
                        </template>
                        <template v-else>
                            Выберите дату и время
                        </template>
                    </label>
                    <div class="control">
                        <input
                            v-bind="field"
                            class="input"
                            :class="{ 'is-danger': Object.keys(errors).length }"
                            :placeholder="$t('Interface.Misc.ContactForm.Name')"
                        >
                    </div>
                </Field>

                <hr>

                <div class="control">
                    <button type="submit" class="button is-theme is-fullwidth">
                        Забронировать
                    </button>
                </div>
            </Form>
        </ion-content>
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
import { Field, Form } from "vee-validate"

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
        Field,
        Form
    },
    data() {
        return {
            Form: {
                Datetime: null
            }
        }
    }
}
</script>
