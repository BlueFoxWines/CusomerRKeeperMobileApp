<template>
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container">
                <contact-form/>
            </div>
        </div>
    </section>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue"

export default {
    name: "About",
    components: {
        ContactForm
    }

}
</script>
