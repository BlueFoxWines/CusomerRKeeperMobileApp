<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/" />
                </ion-buttons>

                <ion-title>
                    <h1 class="bluefox-title title">
                        Лаборатория
                    </h1>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
            <div class="container">
                <div class="control">
                    <button type="button" class="button is-theme is-fullwidth" @click="flashlightToggle()">
                        Вкл/выкл фонарик
                    </button>
                </div>
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
    IonTitle,
    isPlatform
} from "@ionic/vue"
import { Flashlight } from "@ionic-native/flashlight"
import notify from "@/utils/Notifications"

export default {
    name: "TestNativePlugins",
    components: {
        IonPage,
        IonContent,
        IonButtons,
        IonBackButton,
        IonHeader,
        IonToolbar,
        IonTitle
    },
    methods: {
        flashlightToggle() {
            if (isPlatform("hybrid")) {
                Flashlight.toggle(
                    function() { // optional success callback
                        notify("success", "Фонарик переключён")
                    },
                    function() { // optional error callback
                        notify("danger", "Фонарик не переключён")
                    },
                    { intensity: 0.5 } // optional as well, used on iOS when switching on
                )
            }
            else
                notify("danger", "Фонарик доступен только на смартфоне")
        }
    }
}
</script>
