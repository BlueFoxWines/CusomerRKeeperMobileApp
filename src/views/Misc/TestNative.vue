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
                        <template v-if="FlashlightOn">
                            Выключить фонарик
                        </template>
                        <template v-else>
                            Включить фонарик
                        </template>
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
    data() {
        return {
            FlashlightOn: (isPlatform("hybrid")) ? Flashlight.isSwitchedOn() : false
        }
    },
    methods: {
        flashlightToggle() {
            const THIS = this
            if (isPlatform("hybrid")) {
                if (!this.FlashlightOn)
                    Flashlight.switchOn(
                        function() { // optional success callback
                            notify("success", "Фонарик включён", 500)
                            THIS.FlashlightOn = !THIS.FlashlightOn
                        },
                        function() { // optional error callback
                            notify("danger", "Фонарик не может быть включён", 500)
                        },
                        { intensity: 1 } // optional as well, used on iOS when switching on
                    )
                else
                    Flashlight.switchOff(
                        function() { // optional success callback
                            notify("success", "Фонарик выключён", 500)
                            THIS.FlashlightOn = !THIS.FlashlightOn
                        },
                        function() { // optional error callback
                            notify("danger", "Фонарик не может быть выключён", 500)
                        }
                    )
            }
            else
                notify("danger", "Фонарик доступен только на смартфоне", 3000)
        }
    }
}
</script>
