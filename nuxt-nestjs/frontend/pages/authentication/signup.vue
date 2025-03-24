<template>
    <div class="flex flex-col items-center justify-center h-full">
        <div class="flex flex-col gap-4 w-full">
            <h1 class="text-4xl">S'inscrire</h1>
            <UAlert v-if="errorMessage" color="error" title="Erreur" :description="errorMessage" />
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormField label="Email" name="email" size="xl">
                    <UInput v-model="state.email" class="w-full" />
                </UFormField>
                <UFormField label="Nom d'utilisateur" name="username" size="xl">
                    <UInput v-model="state.username" class="w-full" />
                </UFormField>
                <UFormField label="Mot de passe" name="password" size="xl">
                    <UInput v-model="state.password" type="password" class="w-full" />
                </UFormField>
                <UButton type="submit">S'inscrire</UButton>
            </UForm>
            <p>
                Déjà un compte ?
                <NuxtLink to="/authentication/signin" class="underline underline-offset-4"
                    >Se connecter</NuxtLink
                >
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'
import { addUser } from '~/services/users.service'

type Schema = InferType<typeof schema>

const errorMessage = ref(null)

const schema = object({
    email: string().email('L\iemail est invalide').required('Requis'),
    username: string().required('Requis'),
    password: string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractère')
        .required('Requis'),
})

const state = reactive({
    email: undefined,
    username: undefined,
    password: undefined,
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    try {
        await addUser(event.data)
        return navigateTo('/authentication/confirmation')
    } catch (error: any) {
        if (error.response && error.response._data && error.response._data.description) {
            errorMessage.value = error.response._data.description.join(' et ').toString()
        }
    }
}
</script>
