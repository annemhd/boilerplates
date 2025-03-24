<template>
    <div v-if="loading">Connexion en cours</div>
    <div v-else>
        <UButton @click="router.back()">Retour</UButton>
        <UAlert v-if="errorMessage" color="error" title="Erreur" :description="errorMessage" />
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormField label="Email" name="email">
                <UInput v-model="state.email" />
            </UFormField>
            <UFormField label="Password" name="password">
                <UInput v-model="state.password" type="password" />
            </UFormField>

            <UButton type="submit">S'identifier</UButton>
        </UForm>
    </div>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'
import { authentication } from '~/services/auth.service'

type Schema = InferType<typeof schema>

const loading = ref<boolean>(false)
const token = useCookie('token')
const router = useRouter()
const errorMessage = ref(null)

const schema = object({
    email: string().email('Email invalide').required('Requis'),
    password: string().required('Requis'),
})

const state = reactive({
    email: undefined,
    password: undefined,
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    try {
        console.log(event.data)
        const response: any = await authentication(event.data)
        token.value = response.access_token
        console.log(response)
        loading.value = true
    } catch (error: any) {
        if (error.response && error.response._data && error.response._data.description) {
            errorMessage.value = error.response._data.description.toString()
        }
    } finally {
        if (token.value) {
            setTimeout(() => {
                window.location.assign('/account')
            }, 1000)
        }
    }
}
</script>
