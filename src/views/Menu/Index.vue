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
                <div class="menu columns is-gapless is-multiline is-mobile">
                    <div class="menu-item column is-half">
                        <figure class="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                    <div class="menu-item column is-half">
                        <figure class="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                    <div class="menu-item column is-half">
                        <figure class="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                    <div class="menu-item column is-half">
                        <figure class="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                    <div class="menu-item column is-half">
                        <figure class="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                    <div class="menu-item column is-half">
                        <figure class="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                    <div class="menu-item column is-half">
                        <figure class="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                    <div class="menu-item column is-half">
                        <figure class="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                    <div class="menu-item column is-half">
                        <figure class="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
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
    }
}
</script>
