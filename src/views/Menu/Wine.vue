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
                        Villa Blanche Malbec, 2017
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
                                    Вид
                                </dt>
                                <dd class="wine-features-feature-value">
                                    Тихое вино
                                </dd>
                            </dl>
                            <dl class="wine-features-feature">
                                <dt class="wine-features-feature-title">
                                    Страна
                                </dt>
                                <dd class="wine-features-feature-value">
                                    Франция
                                </dd>
                            </dl>
                            <dl class="wine-features-feature">
                                <dt class="wine-features-feature-title">
                                    Страна
                                </dt>
                                <dd class="wine-features-feature-value">
                                    Франция
                                </dd>
                            </dl>
                            <dl class="wine-features-feature">
                                <dt class="wine-features-feature-title">
                                    Страна
                                </dt>
                                <dd class="wine-features-feature-value">
                                    Франция
                                </dd>
                            </dl>
                            <div class="wine-features-price">
                                <span>
                                    9 800 ₽
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="wine-expo column">
                        <figure class="wine-expo-image">
                            <img src="assets/wine.png">
                        </figure>
                        <div class="control">
                            <button type="button" class="wine-expo-buy button is-theme">
                                Добавить в корзину
                            </button>
                        </div>
                    </div>
                </div>
                <div class="wine-bottom column">
                    <div class="wine-desc">
                        <p>
                            Nulla quis lorem ut libero malesuada feugiat.
                            Sed porttitor lectus nibh. Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Sed porttitor lectus nibh.
                        </p>
                    </div>
                    <div class="wine-suggestedfood">
                        <div class="wine-suggestedfood-title">
                            Рекомендуемая подача
                        </div>
                        <div class="wine-suggestedfood-icons">
                            <div class="menu-icon">
                                <ion-icon src="assets/icon_fish.svg" />
                            </div>
                            <div class="menu-icon">
                                <ion-icon src="assets/icon_meat.svg" />
                            </div>
                            <div class="menu-icon">
                                <ion-icon src="assets/icon_fruits.svg" />
                            </div>
                            <div class="menu-icon">
                                <ion-icon src="assets/icon_cheese.svg" />
                            </div>
                            <div class="menu-icon">
                                <ion-icon src="assets/icon_vegetables.svg" />
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
                Name: "Val di Toro, 2015",
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
                    "fish"
                ]
            }
        }
    }
}
</script>

<style scoped>
    .winecart {
        display: flex;
        width: 2rem !important;
        height: 2rem !important;
        border-radius: 50%;
        background-color: var(--color-white0) !important;
    }
</style>
