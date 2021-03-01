<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar>
                <ion-buttons slot="secondary">
                    <ion-button>
                        <ion-icon slot="icon-only" src="assets/icon_filters.svg" />
                    </ion-button>
                </ion-buttons>

                <ion-title>
                    <h1 class="bluefox-title title">
                        {{ $t("Interface.Menu.Categories.Wine") }}
                    </h1>
                </ion-title>

                <ion-buttons slot="primary">
                    <ion-button>
                        <ion-icon slot="icon-only" src="assets/icon_cart.svg" />
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding">
            <div class="container">
                <div class="menu columns is-mobile is-multiline">
                    <div v-for="MenuItem in Menu" :key="MenuItem.Name" class="menu-wine column is-half-mobile is-3-tablet is-2-desktop">
                        <router-link :to="{ name: 'Menu' }" class="menu-wine-container column columns is-gapless">
                            <div class="menu-wine-container-top column">
                                <div class="menu-wine-container-top-bg" />
                                <figure class="menu-wine-container-top-image">
                                    <img :src="MenuItem.Image">
                                </figure>
                                <div class="menu-wine-container-top-info">
                                    <p class="menu-wine-container-top-info-text">
                                        {{ MenuItem.Wine }}
                                    </p>
                                    <div v-if="MenuItem.Suggested.length > 0" class="menu-wine-container-top-info-food">
                                        <div v-for="SuggestedFood in MenuItem.Suggested" :key="SuggestedFood" class="menu-icon">
                                            <ion-icon :src="`assets/icon_${SuggestedFood}.svg`" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="menu-wine-container-bottom column">
                                <p class="menu-wine-container-bottom-name">{{ MenuItem.Name }}</p>
                            </div>
                        </router-link>
                        <div class="menu-wine-additional column columns is-gapless">
                            <div class="column">
                                <p class="menu-wine-additional-price">{{ MenuItem.Price }} ₽</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonPage,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle
} from "@ionic/vue"

export default  {
    name: "Menu",
    components: {
        IonPage,
        IonContent,
        IonButton,
        IonButtons,
        IonIcon,
        IonHeader,
        IonToolbar,
        IonTitle
    },
    data () {
        return {
            Menu: [
                {
                    Name: "Val di Toro, 2015",
                    Wine: "Tempranillo",
                    Price: "34999",
                    Image: "assets/wine.png",
                    Suggested: [
                        "meat",
                        "cheese"
                    ]
                },
                {
                    Name: "Nobilomo Marzemino Semi-Sweet, 2015",
                    Wine: "Cantina Puianello",
                    Price: "27590",
                    Image: "assets/wine.png",
                    Suggested: [
                        "fruits",
                        "vegetables",
                        "dessert"
                    ]
                },
                {
                    Name: "Villa Blanche, 2009",
                    Wine: "Malbec",
                    Price: "14590",
                    Image: "assets/wine.png",
                    Suggested: [
                        "meat",
                        "dessert"
                    ]
                },
                {
                    Name: "Lago Vibrant & Aromatic Vinho Verde, 2016",
                    Wine: "Salvador",
                    Price: "54890",
                    Image: "assets/wine.png",
                    Suggested: [
                        "fish"
                    ]
                },
                {
                    Name: "Val di Toro, 2015",
                    Wine: "Tempranillo",
                    Price: "34999",
                    Image: "assets/wine.png",
                    Suggested: [
                        "meat",
                        "cheese"
                    ]
                },
                {
                    Name: "Nobilomo Marzemino Semi-Sweet, 2015",
                    Wine: "Cantina Puianello",
                    Price: "27590",
                    Image: "assets/wine.png",
                    Suggested: [
                        "fruits",
                        "vegetables",
                        "dessert"
                    ]
                }
            ]
        }
    }
}
</script>
