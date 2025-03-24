<template>
    <div v-if="loading">Connexion en cours</div>
    <div v-else class="flex flex-col items-center justify-center h-full">
        <div class="flex flex-col gap-4 w-full">
            <h1 class="text-4xl">Se connecter</h1>
            <UAlert v-if="errorMessage" color="error" title="Erreur" :description="errorMessage" />
            <UForm class="space-y-4" :schema="schema" :state="state" @submit="onSubmit">
                <UFormField label="Email" name="email" size="xl">
                    <UInput v-model="state.email" class="w-full" />
                </UFormField>
                <UFormField label="Mot de passe" name="password" size="xl">
                    <UInput v-model="state.password" type="password" class="w-full" />
                </UFormField>
                <UButton type="submit">Se connecter</UButton>
            </UForm>
            <p>
                Pas encore de compte ?
                <NuxtLink to="/authentication/signup" class="underline underline-offset-4"
                    >Créer un compte</NuxtLink
                >
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'
import { authentication } from '~/services/auth.service'

type Schema = InferType<typeof schema>

const loading = ref<boolean>(false)
const token = useCookie('token')
const errorMessage = ref(null)

const schema = object({
    email: string().email("L'email est invalide"),
    password: string(),
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
