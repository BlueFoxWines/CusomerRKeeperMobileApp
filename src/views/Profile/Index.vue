<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="secondary">
                    <router-link
                        :to="{ name: 'TestNative' }"
                    >
                        <ion-button>
                            <ion-icon slot="icon-only" src="assets/icon_filters.svg" />
                        </ion-button>
                    </router-link>
                </ion-buttons>
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
        <ion-content fullscreen class="ion-padding">
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
                    <div class="profile-highlight">
                        <h1 class="profile-name bluefox-title title">
                            Синий лис
                        </h1>
                        <p class="profile-phonenumber bluefox-text">
                            +79090900909
                        </p>
                    </div>
                    <div class="profile-additional">
                        <p>
                            Эраст Петрович Фандорин родился 8 января 1856 года в старинной дворянской семье. Интерес ко всему, что связано
                            с расследованием преступлений, привёл его в московское полицейское управление.
                        </p>
                    </div>
                    <hr>
                    <p class="profile-bonuses">
                        {{ $t("Interface.Profile.Bonuses") }}: 777
                    </p>
                </div>
            </div>
            <span class="appversion">
                {{ $t("Interface.Misc.AppVersion") }}: {{ version }}
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
