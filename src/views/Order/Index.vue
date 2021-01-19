<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <section class="section">
                <div class="container has-text-centered">
                    <h1 class="bluefox-title title">{{ $t("Interface.Order.Title") }}</h1>
                    <p class="bluefox-text">
                        {{ $t("Interface.Order.Empty") }}
                    </p>
                    <hr>
                    <div class="control">
                        <router-link
                            :to="{ name: 'Menu' }"
                            class="button is-theme is-fullwidth"
                        >
                            {{ $t("Interface.Order.Preorder") }}
                        </router-link>
                        <br>
                        <router-link
                            :to="{ name: 'Login' }"
                            class="button is-theme is-outlined is-fullwidth"
                        >
                            {{ $t("Interface.Order.Booking") }}
                        </router-link>
                    </div>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue"

export default {
    name: "Orders",
    components: { IonContent, IonPage }
}
</script>
