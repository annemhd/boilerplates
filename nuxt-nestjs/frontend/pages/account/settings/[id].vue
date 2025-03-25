<template>
    <div class="flex flex-col gap-2">
        <h2 class="text-xl">Informations principales</h2>

        <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
            <UFormField label="Email" name="email">
                <UInput v-model="state.email" class="w-full" />
            </UFormField>
            <UButton type="submit" class="inline-block">Valider les modifications</UButton>
        </UForm>

        <USeparator class="my-4" />

        <div class="space-y-4">
            <h2 class="text-xl">Mot de passe</h2>
            <UButton
                :to="{ name: 'account-settings-password-id', params: { id: id } }"
                class="inline-block"
                >Modifier mon mot de passe</UButton
            >
        </div>

        <USeparator class="my-4" />

        <div class="space-y-4">
            <h2 class="text-xl">Supprimer mon compte</h2>
            <UModal v-model:open="displayModal" title="Supprimer mon compte définitivement">
                <UButton
                    label="Supprimer mon compte"
                    color="error"
                    variant="soft"
                    class="cursor-pointer"
                />
                <template #body>
                    <p class="mb-6">
                        Êtes-vous sûre de vouloir supprimer votre compte ? Cette action est
                        définitive
                    </p>
                    <div class="flex gap-3">
                        <UButton
                            color="neutral"
                            variant="outline"
                            class="w-full cursor-pointer"
                            @click="showModal"
                            >Non</UButton
                        >
                        <UButton
                            color="error"
                            class="w-full cursor-pointer"
                            @click="deleteAccount()"
                            >Supprimer mon compte</UButton
                        >
                    </div>
                </template>
            </UModal>
        </div>
    </div>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'
import { getUser, updateUser } from '~/services/users.service'

onMounted(async () => {
    await retriveCurrentUser()
    state.email = user.value.email
})

type Schema = InferType<typeof schema>

const route = useRoute()
const id = route.params.id
const displayModal = ref<boolean>(false)
const user = ref()
const errorMessage = ref(null)
const toast = useToast()

const schema: any = object({
    email: string().email('Email invalide').required('Requis'),
})

const state: Schema = reactive({
    email: undefined,
})

const retriveCurrentUser = async () => {
    user.value = await getUser(id)
}

const showModal = () => {
    displayModal.value = !displayModal.value
}

const deleteAccount = () => {
    return navigateTo(`/account/delete/${id}`)
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
