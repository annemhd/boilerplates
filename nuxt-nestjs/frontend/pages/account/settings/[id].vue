<template>
    <div class="flex flex-col gap-2">
        <h2 class="text-xl font-bold">Informations principales</h2>

        <UForm
            :schema="schema"
            :state="state"
            class="flex flex-col items-end gap-4"
            @submit="onSubmit"
        >
            <UFormField label="Email" name="email" class="w-full">
                <UInput v-model="state.email" class="w-full" />
            </UFormField>
            <UButton type="submit" class="w-fit">Valider les modifications</UButton>
        </UForm>

        <USeparator class="my-4" />

        <div class="flex justify-between items-end">
            <div>
                <h2 class="text-xl font-bold">Supprimer mon compte</h2>
                <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>

            <UModal v-model:open="displayModal" title="Supprimer mon compte définitivement">
                <UButton label="Supprimer mon compte" color="error" class="h-fit" />
                <template #body>
                    <p class="mb-6">
                        Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
                        irréversible et toutes vos données seront perdues
                    </p>

                    <div class="flex gap-3 justify-end">
                        <UButton color="neutral" variant="outline" @click="showModal"
                            >Annuler</UButton
                        >
                        <UButton color="error" @click="deleteAccount()"
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
