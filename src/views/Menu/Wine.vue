<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/main/menu" />
                </ion-buttons>

                <ion-buttons slot="primary">
                    <ion-button class="winecart">
                        <ion-icon slot="icon-only" src="assets/icon_cart.svg" />
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen>
            <div class="wine columns is-mobile">
                <div class="wine-top">
                    <div class="wine-title">
                        {{ Wine.Name }}
                    </div>
                    <div class="wine-fav">
                        <!-- <div class="menu-icon">
                            <ion-icon src="assets/icon_heart_outlined.svg" />
                        </div> -->
                    </div>
                </div>
                <div class="wine-middle column columns is-mobile">
                    <div class="wine-features column">
                        <div class="container">
                            <div class="wine-features-rating">
                                <span>
                                    ======
                                </span>
                            </div>
                            <dl class="wine-features-feature">
                                <dt class="wine-features-feature-title">
                                    {{ $t("Interface.Wine.Type") }}
                                </dt>
                                <dd class="wine-features-feature-value">
                                    {{ Wine.Type }}
                                </dd>
                            </dl>
                            <dl class="wine-features-feature">
                                <dt class="wine-features-feature-title">
                                    {{ $t("Interface.Wine.Country") }}
                                </dt>
                                <dd class="wine-features-feature-value">
                                    {{ Wine.Country }}
                                </dd>
                            </dl>
                            <dl class="wine-features-feature">
                                <dt class="wine-features-feature-title">
                                    {{ $t("Interface.Wine.Wine") }}
                                </dt>
                                <dd class="wine-features-feature-value">
                                    {{ Wine.Wine }}
                                </dd>
                            </dl>
                            <dl class="wine-features-feature">
                                <dt class="wine-features-feature-title">
                                    {{ $t("Interface.Wine.Volume") }}
                                </dt>
                                <dd class="wine-features-feature-value">
                                    {{ Wine.Volume }} л
                                </dd>
                            </dl>
                            <div class="wine-features-price">
                                <span>
                                    {{ Wine.Price }} ₽
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="wine-expo column">
                        <figure class="wine-expo-image">
                            <img :src="Wine.Image">
                        </figure>
                        <div class="control">
                            <button type="button" class="wine-expo-buy button is-theme">
                                {{ $t("Interface.Button.AddToCart") }}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="wine-bottom column">
                    <div
                        class="wine-desc showhidetext"
                        :class="{ 'is-opened': ShowDescription }"
                    >
                        <p>
                            {{ Wine.Description }}
                        </p>
                        <span
                            class="showhidetext-link"
                            @click="ShowDescription = !ShowDescription"
                        >
                            <template v-if="!ShowDescription">Подробнее</template>
                            <template v-else>Короче</template>
                        </span>
                    </div>
                    <div class="wine-suggestedfood">
                        <div class="wine-suggestedfood-title">
                            {{ $t("Interface.Wine.SuggestedFood") }}
                        </div>
                        <div v-if="Wine.Suggested.length > 0" class="wine-suggestedfood-icons">
                            <div v-for="SuggestedFood in Wine.Suggested" :key="SuggestedFood" class="menu-icon">
                                <ion-icon :src="`assets/icon_${SuggestedFood}.svg`" />
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
    IonBackButton,
    IonIcon,
    IonHeader,
    IonToolbar
} from "@ionic/vue"

export default  {
    name: "Menu",
    components: {
        IonPage,
        IonContent,
        IonButton,
        IonButtons,
        IonBackButton,
        IonIcon,
        IonHeader,
        IonToolbar
    },
    data () {
        return {
            Wine: {
                Id: 0,
                Name: "Villa Blanche Tempranillo, 2009",
                Wine: "Tempranillo",
                Price: "34999",
                Image: "assets/wine.png",
                Rating: 4,
                Type: "Тихое вино",
                Country: "Франция",
                Volume: "0.75",
                Description: "Nulla quis lorem ut libero malesuada feugiat. \
                    Sed porttitor lectus nibh. Lorem ipsum dolor sit amet, \
                    consectetur adipiscing elit. Sed porttitor lectus nibh. \
                    Sed porttitor lectus nibh. Pellentesque in ipsum id orci porta dapibus. \
                    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. \
                    Donec sollicitudin molestie malesuada.",
                Suggested: [
                    "meat",
                    "cheese",
                    "fish",
                    "fruits"
                ]
            },
            ShowDescription: false
        }
    }
}
</script>

<style scoped>
    .winecart {
        display: flex;
        width: 25px !important;
        height: 25px !important;
        border-radius: 50%;
        background-color: var(--color-white0) !important;
    }
</style>
