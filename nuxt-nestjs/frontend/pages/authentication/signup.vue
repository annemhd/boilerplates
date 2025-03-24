<template>
    <div>
        <UAlert v-if="errorMessage" color="error" title="Erreur" :description="errorMessage" />
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormField label="Email" name="email">
                <UInput v-model="state.email" />
            </UFormField>
            <UFormField label="Nom d'utilisateur" name="username">
                <UInput v-model="state.username" />
            </UFormField>
            <UFormField label="Password" name="password">
                <UInput v-model="state.password" type="password" />
            </UFormField>

            <UButton type="submit">S'incrire</UButton>
        </UForm>
        <NuxtLink to="/">
            <UButton @click="router.back()">Retour</UButton>
        </NuxtLink>
    </div>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'
import { addUser } from '~/services/users.service'

type Schema = InferType<typeof schema>

const router = useRouter()
const errorMessage = ref(null)

const schema = object({
    email: string().email('Email invalide').required('Requis'),
    username: string().required('Requis'),
    password: string().min(8, 'Au moins 8 characters').required('Requis'),
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
