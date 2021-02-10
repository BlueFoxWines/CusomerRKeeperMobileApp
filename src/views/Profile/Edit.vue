<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/main/profile" />
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :scroll-y="false" class="ion-padding">
            <div class="container">
                <div class="profile">
                    <template v-if="photos.length > 0">
                        <figure v-for="photo in photos" :key="photo" class="image">
                            <img class="profile-avatar is-rounded" :src="photo.webviewPath" @click="showActionSheet(photo)">
                        </figure>
                    </template>
                    <template v-else>
                        <figure class="image">
                            <img class="profile-avatar is-rounded" src="/assets/profile_default.png" @click="showActionSheet(photo)">
                        </figure>
                    </template>
                    <Form class="form" @submit="saveProfile">
                        <Field
                            v-slot="{ field, errors, errorMessage }"
                            v-model="Form.Name"
                            name="Name"
                            :rules="ValidationRules.Name"
                            as="div"
                            class="field"
                            type="text"
                        >
                            <label class="label" :class="{ 'has-text-danger': Object.keys(errors).length }">
                                <template v-if="Object.keys(errors).length">
                                    {{ errorMessage }}
                                </template>
                                <template v-else>
                                    {{ $t("Interface.Misc.ContactForm.Name") }}
                                </template>
                            </label>
                            <div class="control">
                                <input
                                    v-bind="field"
                                    class="input"
                                    :class="{ 'is-danger': Object.keys(errors).length }"
                                    :placeholder="$t('Interface.Misc.ContactForm.Name')"
                                >
                            </div>
                        </Field>
                        <Field
                            v-slot="{ field, errors, errorMessage }"
                            v-model="Form.Phone"
                            name="Phone"
                            as="div"
                            class="field"
                            type="tel"
                        >
                            <label class="label" :class="{ 'has-text-danger': Object.keys(errors).length }">
                                <template v-if="Object.keys(errors).length">
                                    {{ errorMessage }}
                                </template>
                                <template v-else>
                                    {{ $t("Interface.Misc.ContactForm.Phone") }}
                                </template>
                            </label>
                            <div class="control">
                                <input
                                    v-bind="field"
                                    class="input"
                                    :class="{ 'is-danger': Object.keys(errors).length }"
                                    :placeholder="$t('Interface.Misc.ContactForm.Phone')"
                                    disabled
                                >
                            </div>
                        </Field>
                        <hr>
                        <div class="control">
                            <button type="submit" class="button is-theme is-fullwidth">
                                {{ $t("Interface.Button.Save") }}
                            </button>
                        </div>
                        <loading :active="IsLoading" :is-full-page="true" />
                    </Form>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonPage,
    IonContent,
    IonBackButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    actionSheetController,
    isPlatform
} from "@ionic/vue"
import { string } from "yup"
var yup = { string }
import { Field, Form } from "vee-validate"
import notify from "@/utils/Notifications"
import { useAvatarPhoto } from "@/composables/useAvatar"
import LoadingState from "@/mixins/LoadingState"
import Loading from "@/components/Loading.vue"
import i18n from "@/i18n"

export default  {
    name: "ProfileEdit",
    components: {
        IonPage,
        IonContent,
        IonBackButton,
        IonButtons,
        IonHeader,
        IonToolbar,
        Field,
        Form,
        Loading
    },
    mixins: [LoadingState],
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
                    role: "cancel"
                }
            ]
            const buttonDelete = {
                text: i18n.global.t("Interface.Button.Delete"),
                role: "destructive",
                handler: () => {
                    deletePhoto(photo)
                }
            }

            if (photos.value.length > 0) {
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
    },
    data() {
        return {
            ValidationRules: {
                Name: yup.string().required().ensure().min(2)
            },
            Form: {
                Name: null,
                Phone: null
            }
        }
    },
    methods: {
        saveProfile() {
            notify("warning", "Ещё не реализовано")
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
