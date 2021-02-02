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
            <iframe id="myIFrame" :src="link" onload="console.log(this.src)" />
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

export default defineComponent({
    name: "PayIframeModal",
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
        function Handler(event) {
            console.log(event)
        }
        var iframe = document.getElementById("myIFrame")
        console.log(iframe)
        iframe.addEventListener("loadstart", Handler)
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
