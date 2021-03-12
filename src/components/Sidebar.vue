<template>
    <ion-menu side="start" menu-id="filter" content-id="filter-main" type="overlay">
        <ion-content class="sidebar ion-padding">
            <ul class="sidebar-accordion">
                <li class="sidebar-accordion-item">
                    <div
                        class="sidebar-accordion-item-header"
                        @click="Type.Active = !Type.Active"
                    >
                        <p class="title">Вид</p>
                    </div>
                    <div
                        class="sidebar-accordion-item-content"
                        :class="{ 'is-hide': !Type.Active }"
                    >
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox">
                                Тихое вино
                            </label>
                        </div>
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox">
                                Игристое вино
                            </label>
                        </div>
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox">
                                Креплёное вино
                            </label>
                        </div>
                    </div>
                </li>
                <li class="sidebar-accordion-item">
                    <div
                        class="sidebar-accordion-item-header"
                        @click="Country.Active = !Country.Active"
                    >
                        <p class="title">Страна</p>
                    </div>
                    <div
                        class="sidebar-accordion-item-content"
                        :class="{ 'is-hide': !Country.Active }"
                    >
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox">
                                Франция
                            </label>
                        </div>
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox">
                                Италия
                            </label>
                        </div>
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox">
                                Испания
                            </label>
                        </div>
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox">
                                Германия
                            </label>
                        </div>
                    </div>
                </li>
            </ul>
        </ion-content>
    </ion-menu>
</template>

<script>
import {
    IonContent,
    IonMenu
} from "@ionic/vue"

export default {
    name: "Sidebar",
    components: {
        IonContent,
        IonMenu
    },
    data() {
        return {
            Type: {
                Active: true
            },
            Country: {
                Active: false
            }
        }
    },
    methods: {
        toggle() {
            console.log("It's toggled")
        }
    }
}
</script>
