<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="primary">
                    <router-link
                        :to="{ name: 'ProfileEdit' }"
                    >
                        <ion-button>
                            <ion-icon slot="icon-only" src="assets/icon_edit_user.svg" />
                        </ion-button>
                    </router-link>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :scroll-y="false" class="ion-padding">
            <div class="container">
                <div class="profile">
                    <template v-if="photos.length > 0">
                        <figure v-for="photo in photos" :key="photo" class="image">
                            <img class="profile-avatar is-rounded" :src="photo.webviewPath">
                        </figure>
                    </template>
                    <template v-else>
                        <figure class="image">
                            <img class="profile-avatar is-rounded" src="/assets/profile_default.png">
                        </figure>
                    </template>
                    <h1 class="profile-name bluefox-title title">
                        Синий лис
                    </h1>
                    <p class="profile-phonenumber bluefox-text">
                        +79090900909
                    </p>
                    <hr>
                    <p class="profile-bonuses">
                        Бонусы: 777
                    </p>
                </div>
            </div>
            <span class="appversion">
                Версия {{ version }}
            </span>
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
    IonToolbar
} from "@ionic/vue"
import { version } from "../../../package.json"
import { useAvatarPhoto } from "@/composables/useAvatar"

export default  {
    name: "Profile",
    components: {
        IonPage,
        IonContent,
        IonButton,
        IonButtons,
        IonIcon,
        IonHeader,
        IonToolbar
    },
    setup() {
        const { photos } = useAvatarPhoto()
        return {
            photos,
            version
        }
    }
}
</script>

<style scoped>
    .ion-page:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 12rem;
        left: 0px;
        top: 0;
        background-color: var(--color-beige2);
        border-radius: 0px 0px 15px 15px;
        z-index: 0;
    }
    ion-header,
    ion-content {
        background: transparent;
        --background: transparent;
    }
</style>
