<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <section class="hero is-fullheight">
                <div class="hero-body">
                    <div class="container">
                        <contact-form />
                    </div>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue"
import ContactForm from "@/components/ContactForm.vue"

export default {
    name: "About",
    components: {
        ContactForm,
        IonContent,
        IonPage
    }

}
</script>
