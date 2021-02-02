<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ title }}</ion-title>
                <ion-buttons slot="start">
                    <ion-button @click="closeModal">
                        {{ $t("Interface.Button.Close") }}
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <iframe id="myIFrame" :src="link" />
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonPage,
    IonButtons,
    IonButton,
    modalController
} from "@ionic/vue"
import { defineComponent } from "vue"
import notify from "@/utils/Notifications"

export default defineComponent({
    name: "TinkoffIframeModal",
    components: {
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonPage,
        IonButtons,
        IonButton
    },
    props: {
        title: {
            type: String,
            default: "Modal"
        },
        link: {
            type: String,
            default: null
        }
    },
    mounted() {
        const THIS = this
        var eventMethod = window.addEventListener
            ? "addEventListener"
            : "attachEvent"
        var eventer = window[eventMethod]
        var messageEvent = eventMethod === "attachEvent"
            ? "onmessage"
            : "message"

        eventer(messageEvent, function (e) {
            if (e.data === "success" || e.message === "success") {
                notify("success", THIS.$t("Message.Payment.Success"))
                THIS.closeModal()
                THIS.$router.replace({ name: "Orders" })
            }
            else if (e.data === "fail" || e.message === "fail") {
                notify("danger", THIS.$t("Message.Payment.Fail"))
                THIS.closeModal()
            }
            // console.log(e)
        })
    },
    methods: {
        async closeModal() {
            const modal = await modalController
            return modal.dismiss()
        }
    }
})
</script>

<style scoped>
    ion-content {
        height: 100vh;
    }
    iframe {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
</style>
