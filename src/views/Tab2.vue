<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <section class="section">
                <div class="container has-text-centered">
                    <h1 class="bluefox-title title">Ваши заказы</h1>
                    <p class="bluefox-text">
                        Кажется, вы ещё ни разу у нас не заказывали
                    </p>
                    <hr>
                    <div class="control">
                        <router-link
                            :to="{ name: 'Login' }"
                            class="button is-theme is-fullwidth"
                        >
                            Оформить предзаказ
                        </router-link>
                        <br>
                        <router-link
                            :to="{ name: 'Login' }"
                            class="button is-theme is-outlined is-fullwidth"
                        >
                            Забронировать стол
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
