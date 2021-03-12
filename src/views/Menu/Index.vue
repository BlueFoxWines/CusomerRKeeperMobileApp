<template>
    <div>
        <ion-page>
            <Sidebar />
            <ion-header translucent>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button @click="openMenu()">
                            <ion-icon slot="icon-only" src="assets/icon_filters.svg" />
                        </ion-button>
                    </ion-buttons>

                    <ion-title>
                        <h1 class="categoryselector bluefox-title title" @click="ShowCategories = !ShowCategories">
                            {{ Categories.find(x => x.Active).Title }}
                            <ion-icon src="assets/icon_arrow_down.svg" />
                        </h1>
                    </ion-title>

                    <ion-buttons slot="primary">
                        <ion-button>
                            <ion-icon slot="icon-only" src="assets/icon_cart.svg" />
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content id="filter-main" fullscreen class="ion-padding">
                <div class="container">
                    <div v-if="Categories.find(x => x.Id === 1).Active" class="menu columns is-mobile is-multiline">
                        <div v-for="WineItem in Wine" :key="WineItem.Name" class="menu-wine column is-half-mobile is-3-tablet is-2-desktop">
                            <router-link :to="{ name: 'Wine', params: { id: WineItem.Id } }" class="menu-wine-container column columns is-gapless">
                                <div class="menu-wine-container-top column">
                                    <div class="menu-wine-container-top-bg" />
                                    <figure class="menu-wine-container-top-image">
                                        <img :src="WineItem.Image">
                                    </figure>
                                    <div class="menu-wine-container-top-info">
                                        <p class="menu-wine-container-top-info-text">
                                            {{ WineItem.Wine }}
                                        </p>
                                        <div v-if="WineItem.Suggested.length > 0" class="menu-wine-container-top-info-food">
                                            <div v-for="SuggestedFood in WineItem.Suggested" :key="SuggestedFood" class="menu-icon">
                                                <ion-icon :src="`assets/icon_${SuggestedFood}.svg`" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="menu-wine-container-bottom column">
                                    <p class="menu-wine-container-bottom-name">{{ WineItem.Name }}</p>
                                </div>
                            </router-link>
                            <div class="menu-wine-additional column columns is-gapless">
                                <div class="column">
                                    <p class="menu-wine-additional-price">{{ WineItem.Price }} ₽</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="Categories.find(x => x.Id === 0).Active" class="menu columns is-multiline">
                        <div v-for="FoodItem in Food" :key="FoodItem.Name" class="menu-food column columns is-gapless">
                            <div class="menu-food-container-top column">
                                <div class="menu-food-container-top-bg" />
                                <figure class="menu-food-container-top-image">
                                    <img :src="FoodItem.Image">
                                </figure>
                                <div class="menu-food-container-top-info">
                                    <p class="menu-wine-container-info-composition">
                                        <span class="menu-wine-container-info-composition">
                                            {{ $t("Interface.Menu.Food.Composition") }}:
                                        </span>
                                        {{ FoodItem.Composition }}
                                    </p>
                                    <div class="menu-wine-container-info-suggestedwine">
                                        <p class="menu-wine-container-info-suggestedwine-name">
                                            {{ FoodItem.Wine }}
                                        </p>
                                        <div class="menu-wine-container-info-suggestedwine-icon">
                                            <ion-icon src="assets/icon_wine.svg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="menu-food-container-bottom column">
                                <p class="menu-food-container-bottom-name">
                                    {{ FoodItem.Name }}
                                </p>
                                <p class="menu-food-container-bottom-price">
                                    {{ FoodItem.Price }} ₽
                                </p>
                                <div class="menu-food-container-bottom-buy control">
                                    <button type="button" class="button is-theme is-fullwidth">
                                        {{ $t("Interface.Button.ToCart") }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ion-content>
            <transition name="poptoast">
                <div v-if="ShowCategories" class="menuselector modal">
                    <div class="modal-background" @click="ShowCategories = false" />
                    <div class="menuselector-container modal-content">
                        <div class="menuselector-container-close">
                            <ion-icon src="assets/icon_times.svg" @click="ShowCategories = !ShowCategories" />
                        </div>
                        <ul class="menuselector-container-list">
                            <li
                                v-for="Item in Categories"
                                :key="Item.Title"
                                class="menuselector-container-list-item"
                                :class="{ 'is-active': Item.Active }"
                                @click="Categories.find(x => x.Active).Active = false; Item.Active = true; ShowCategories = false"
                            >
                                {{ Item.Title }}
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </ion-page>
    </div>
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
    IonTitle,
    menuController
} from "@ionic/vue"
import Sidebar from "@/components/Sidebar.vue"

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
        IonTitle,
        Sidebar
    },
    data () {
        return {
            ShowCategories: false,
            Categories: [
                {
                    Id: 0,
                    Title: this.$t("Interface.Menu.Categories.Food"),
                    Active: false
                },
                {
                    Id: 1,
                    Title: this.$t("Interface.Menu.Categories.Wine"),
                    Active: true
                },
                {
                    Id: 2,
                    Title: this.$t("Interface.Menu.Categories.Drinks"),
                    Active: false
                },
                {
                    Id: 3,
                    Title: this.$t("Interface.Menu.Categories.Accessories"),
                    Active: false
                },
                {
                    Id: 4,
                    Title: this.$t("Interface.Menu.Categories.Tastings"),
                    Active: false
                },
                {
                    Id: 5,
                    Title: this.$t("Interface.Menu.Categories.Certificates"),
                    Active: false
                }
            ],
            Food: [
                {
                    Name: "Ягненок со сливками",
                    Composition: "ягненок, репчатый лук, томат, петрушка,гранат, сливки, соль, перец",
                    Wine: "	Tempranillo",
                    Price: "1490",
                    Image: "assets/food.png"
                },
                {
                    Name: "Мясные роллы",
                    Composition: "рис, говядина, сливочный сыр, майонез, водоросли, кунжут",
                    Wine: "	Malbec",
                    Price: "720",
                    Image: "assets/food.png"
                }
            ],
            Wine: [
                {
                    Id: 0,
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
                    Id: 1,
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
                    Id: 2,
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
                    Id: 3,
                    Name: "Lago Vibrant & Aromatic Vinho Verde, 2016",
                    Wine: "Salvador",
                    Price: "54890",
                    Image: "assets/wine.png",
                    Suggested: [
                        "fish"
                    ]
                },
                {
                    Id: 4,
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
                    Id: 5,
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
            ],
            groups: [
                {
                    name: 1,
                    items: [
                        "terms"
                    ],
                    show: false
                },
                {
                    name: 2,
                    items: [
                        "terms"
                    ],
                    show: true
                },
                {
                    name: 3,
                    items: [
                        "terms"
                    ],
                    show: false
                },
                {
                    name: 4,
                    items: [
                        "terms"
                    ],
                    show: false
                }
            ]
        }
    },
    methods: {
        openMenu() {
            menuController.enable(true, "filter")
            menuController.open("filter")
        }
    }
}
</script>
