<template>
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
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'
import { addUser } from '~/services/users.service'

type Schema = InferType<typeof schema>

const router = useRouter()

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

const toast = useToast()
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    try {
        await addUser(event.data)
        toast.add({
            title: 'Success',
            description: 'Votre inscription a été pris en compte',
            color: 'success',
        })
    } catch (error: any) {
        let errorMessage: any = 'Une erreur est survenue'

        if (error.response && error.response._data && error.response._data.description) {
            errorMessage = error.response._data.description.join(' et ').toString()
        }

        toast.add({
            title: 'Erreur',
            description: `${errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)}`,
            color: 'error',
        })
    }
}
</script>
