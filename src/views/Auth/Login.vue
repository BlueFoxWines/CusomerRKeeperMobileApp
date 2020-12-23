<template>
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-flex is-centered">
                    <figure class="image is-128x128">
                        <img class="is-rounded" src="https://bulma.io/images/placeholders/256x256.png">
                    </figure>
                </div>
                <div class="form mt-5">
                    <div v-if="!CodeSent" class="field">
                        <label class="label">Введите ваш номер телефона</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Номер телефона">
                        </div>
                    </div>
                    <div v-else class="field">
                        <label class="label">Введите код</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Код">
                        </div>
                    </div>
                    <div class="control">
                        <button
                            type="submit"
                            @click.prevent="sendcode()"
                            class="button is-theme is-fullwidth"
                        >
                            Войти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { LOGIN_REQUEST_SENDCODE } from "@/store/actions/auth"

export default {
    name: "Login",
    data() {
        return {
            Phone: null,
            Code: null,
            CodeSent: false
        }
    },
    methods: {
        sendcode() {
            this.$store.dispatch(LOGIN_REQUEST_SENDCODE, this.Phone)
                .then(() => {
                    this.CodeSent = !this.CodeSent
                })
                // .finally(() => this.switchLoading())
        }
    }
}
</script>
