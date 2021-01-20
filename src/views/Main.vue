<template>
    <ion-page>
        <ion-tabs>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="tab1" href="/main/menu">
                    <ion-icon src="assets/icon_wine.svg" />
                    <ion-label>{{ $t("Interface.Main.Tabs.Menu") }}</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="tab2" href="/main/orders">
                    <ion-icon src="assets/icon_order.svg" />
                    <ion-label>{{ $t("Interface.Main.Tabs.Order") }}</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="tab3" href="/main/profile">
                    <ion-icon src="assets/icon_profile.svg" />
                    <ion-label>{{ $t("Interface.Main.Tabs.Profile") }}</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from "@ionic/vue"

export default {
    name: "Main",
    components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage }
}
</script>
