<template>
    <Form :validation-schema="schema" @submit="sendform" class="form">
        <Field
            v-model="Form.Name"
            name="Name"
            v-slot="{ field, errors, errorMessage }"
            as="div"
            class="field"
            type="text"
        >
            <div class="control">
                <input
                    v-bind="field"
                    class="input"
                    :class="{ 'is-danger': Object.keys(errors).length }"
                    :placeholder="$t('Interface.Misc.ContactForm.Name')"
                />
            </div>
            <label class="label" :class="{ 'has-text-danger': Object.keys(errors).length }">
                <template v-if="Object.keys(errors).length">
                    {{ errorMessage }}
                </template>
            </label>
        </Field>

        <Field
            v-model="Form.Phone"
            name="Phone"
            v-slot="{ field, errors, errorMessage }"
            :rules="validatePhone"
            :validate-on-input="ValidationPhoneIsEager"
            as="div"
            class="field"
            type="tel"
        >
            <div class="control">
                <input
                    v-bind="field"
                    v-maska="'+7 (###) ###-##-##'"
                    @click="setPhoneValue()"
                    class="input"
                    :class="{ 'is-danger': Object.keys(errors).length }"
                    :placeholder="$t('Interface.Misc.ContactForm.Phone')"
                />
            </div>
            <label class="label" :class="{ 'has-text-danger': Object.keys(errors).length }">
                <template v-if="Object.keys(errors).length">
                    {{ errorMessage }}
                </template>
            </label>
        </Field>

        <Field
            v-model="Form.Email"
            name="Email"
            v-slot="{ field, errors, errorMessage }"
            as="div"
            class="field"
            type="text"
        >
            <div class="control">
                <input
                    v-bind="field"
                    class="input"
                    :class="{ 'is-danger': Object.keys(errors).length }"
                    :placeholder="$t('Interface.Misc.ContactForm.Email')"
                />
            </div>
            <label class="label" :class="{ 'has-text-danger': Object.keys(errors).length }">
                <template v-if="Object.keys(errors).length">
                    {{ errorMessage }}
                </template>
            </label>
        </Field>

        <Field
            v-model="Form.Text"
            name="Text"
            v-slot="{ field, errors, errorMessage }"
            as="div"
            class="field"
            type="text"
        >
            <div class="control">
                <textarea
                    rows="3"
                    v-bind="field"
                    class="input"
                    :class="{ 'is-danger': Object.keys(errors).length }"
                    :placeholder="$t('Interface.Misc.ContactForm.Text')"
                    style="height: auto;"
                />
            </div>
            <label class="label" :class="{ 'has-text-danger': Object.keys(errors).length }">
                <template v-if="Object.keys(errors).length">
                    {{ errorMessage }}
                </template>
            </label>
        </Field>

        <div class="control">
            <button type="submit" class="button is-theme is-fullwidth">
                {{ $t("Interface.Button.Send") }}
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup"
import { Field, Form } from "vee-validate"
import { maska } from "maska"
import LoadingState from "@/mixins/LoadingState"
import { notify } from "@/utils/Helpers"
import Validation from "@/utils/Validation"
import { CONTACT_FORM_SEND } from "@/store/actions/contact"

export default {
    name: "ContactForm",
    mixins: [LoadingState],
    components: {
        Field,
        Form
    },
    directives: { maska },
    setup() {
        const schema = yup.object().shape({
            Name: yup.string().required().min(2),
            Email: yup.string().required().email(),
            Text: yup.string().required().min(20)
        })

        return {
            schema
        }
    },
    data() {
        return {
            Form: {
                Name: null,
                Email: null,
                Phone: null,
                Text: null
            },
            ValidationPhoneIsEager: false,
            FormSent: false
        }
    },
    methods: {
        setPhoneValue() {
            if (!this.Form.Phone) {
                this.Form.Phone = "+7"
            }
        },
        validatePhone(value) {
            const result = Validation.validatePhone(value)
            this.ValidationPhoneIsEager = result.eager
            return result.value
        },
        sendform() {
            this.switchLoading()
            this.$store.dispatch(CONTACT_FORM_SEND, this.Form)
                .then(() => {
                    this.FormSent = true
                    notify("is-success", this.$t("Message.Misc.ContactForm.Success"))
                })
                .finally(() => this.switchLoading())
        }
    }
}
</script>
