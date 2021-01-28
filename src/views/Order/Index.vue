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
                    {{ $t("Interface.Order.Empty") }}
                </p>
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
                        {{ $t("Interface.Order.Booking") }}
                    </router-link>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle
} from "@ionic/vue"

export default {
    name: "Orders",
    components: {
        IonContent,
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle
    }
}
</script>
