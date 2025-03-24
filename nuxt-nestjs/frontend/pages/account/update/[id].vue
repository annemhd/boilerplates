<template>
    <UButton @click="router.back()">Retour</UButton>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Email" name="email">
            <UInput v-model="state.email" />
        </UFormField>
        <UFormField label="Nom d'utilisateur" name="username">
            <UInput v-model="state.username" />
        </UFormField>
        <UButton type="submit">Modifier les informations</UButton>
    </UForm>
    <UButton :to="{ name: 'account-update-password-id', params: { id: id } }"
        >Modifier mon mot de passe</UButton
    >
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'
import { getUser, updateUser } from '~/services/users.service'

onMounted(async () => {
    await retriveCurrentUser()
    state.email = user.value.email
    state.username = user.value.username
})
type Schema = InferType<typeof schema>

const route = useRoute()
const id = route.params.id
const user = ref()
const router = useRouter()
const errorMessage = ref(null)
const toast = useToast()

const schema: any = object({
    email: string().email('Email invalide').required('Requis'),
    username: string().required('Requis'),
})

const state: Schema = reactive({
    email: undefined,
    username: undefined,
})

const retriveCurrentUser = async () => {
    user.value = await getUser(id)
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    try {
        await updateUser(id, event.data)
        toast.add({
            title: 'Utilisateur mis à jour',
            description: 'Vos informations ont bien été mis à jour',
            color: 'success',
        })
    } catch (error: any) {
        if (error.response && error.response._data && error.response._data.description) {
            errorMessage.value = error.response._data.description.join(' et ').toString()
        }
    }
}
</script>
