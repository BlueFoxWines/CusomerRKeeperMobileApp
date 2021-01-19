<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t("Interface.Menu.Categories.Wine") }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">
                        {{ $t("Interface.Menu.Categories.Wine") }}
                    </ion-title>
                </ion-toolbar>
            </ion-header>

            <ExploreContainer name="Menu page" />
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue"
import ExploreContainer from "@/components/ExploreContainer.vue"

export default  {
    name: "Tab1",
    components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>
