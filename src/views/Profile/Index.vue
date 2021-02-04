<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="primary">
                    <ion-button>
                        <ion-icon slot="icon-only" src="assets/icon_edit_user.svg" />
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :scroll-y="false" class="ion-padding">
            <div class="container">
                <div class="profile">
                    <figure v-for="photo in photos" :key="photo" class="image">
                        <img class="profile-avatar is-rounded" :src="photo.webviewPath" @click="showActionSheet(photo)">
                    </figure>
                    <h1 class="profile-name bluefox-title title">
                        Синий лис
                    </h1>
                    <p class="profile-phonenumber bluefox-text">
                        +79090900909
                    </p>
                    <br>
                    <hr>
                    <br>
                    <p class="profile-bonuses">
                        Бонусы: 777
                    </p>
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
    actionSheetController,
    isPlatform
} from "@ionic/vue"
import { useAvatarPhoto } from "@/composables/useAvatar"
import i18n from "@/i18n"

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
        const { photos, takePhoto, deletePhoto } = useAvatarPhoto()

        const showActionSheet = async (photo) => {
            let buttonsObj = [
                {
                    text: i18n.global.t("Interface.Button.Add"),
                    handler: () => {
                        takePhoto()
                    }
                },
                {
                    text: i18n.global.t("Interface.Button.Cancel"),
                    role: "cancel",
                    handler: () => {
                        // Nothing to do, action sheet is automatically closed
                    }
                }
            ]
            const buttonDelete = {
                text: i18n.global.t("Interface.Button.Delete"),
                role: "destructive",
                handler: () => {
                    deletePhoto(photo)
                }
            }

            if (photo.filepath !== "bluefox_avatar_picture.jpeg") {
                buttonsObj = [...buttonsObj, buttonDelete]
            }

            const actionSheet = await actionSheetController.create({
                mode: (isPlatform("android") ? "md" : "ios"),
                header: "Фото профиля",
                translucent: true,
                buttons: buttonsObj
            })
            await actionSheet.present()
        }
        return {
            photos,
            takePhoto,
            showActionSheet
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
