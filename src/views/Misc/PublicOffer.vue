<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/main/menu" />
                </ion-buttons>

                <ion-title>
                    <h1 class="bluefox-title title">
                        Публичная оферта
                    </h1>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
            <div class="container">
                <p>
                    loading content here...
                </p>
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

export default {
    name: "PublicOffer",
    components: {
        IonContent,
        IonPage,
        IonButtons,
        IonBackButton,
        IonHeader,
        IonToolbar,
        IonTitle
    }
}
</script>

<style scoped>
    .bluefox-title {
        font-size: 24px;
    }
</style>
