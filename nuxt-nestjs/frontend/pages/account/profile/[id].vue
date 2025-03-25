<template>
    <div class="flex flex-col gap-2">
        <h2 class="text-xl">Informations du profil</h2>

        <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
            <UFormField label="Nom d'utilisateur" name="username">
                <UInput v-model="state.username" class="w-full" />
            </UFormField>
            <UButton type="submit" class="iinline-block">Valider les modifications</UButton>
        </UForm>
    </div>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'
import { getUser, updateUser } from '~/services/users.service'

onMounted(async () => {
    await retriveCurrentUser()
    state.username = user.value.username
})

type Schema = InferType<typeof schema>

const route = useRoute()
const id = route.params.id
const user = ref()
const errorMessage = ref(null)
const toast = useToast()

const schema: any = object({
    username: string().required('Requis'),
})

const state: Schema = reactive({
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
