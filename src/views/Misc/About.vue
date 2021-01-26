<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/" />
                </ion-buttons>

                <ion-title>
                    <h1 class="bluefox-title title">
                        О нас
                    </h1>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
            <div class="container">
                <contact-form />
            </div>
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
import ContactForm from "@/components/ContactForm.vue"

export default {
    name: "About",
    components: {
        ContactForm,
        IonPage,
        IonContent,
        IonButtons,
        IonBackButton,
        IonHeader,
        IonToolbar,
        IonTitle
    }

}
</script>
