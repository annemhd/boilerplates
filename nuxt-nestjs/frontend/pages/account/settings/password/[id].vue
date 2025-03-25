<template>
    <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
        <UFormField label="Nouveau mot de passe" name="password">
            <UInput v-model="state.password" type="password" class="w-full" />
        </UFormField>
        <UButton type="submit" class="w-full">Modifier le mot de passe</UButton>
    </UForm>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'
import { updateUser } from '~/services/users.service'

type Schema = InferType<typeof schema>

const route = useRoute()
const id = route.params.id
const errorMessage = ref(null)
const toast = useToast()

const schema: any = object({
    password: string().min(8, 'Min 8').required('Requis'),
})

const state: Schema = reactive({
    password: undefined,
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    try {
        await updateUser(id, event.data)
        state.password = undefined
        toast.add({
            title: 'Mot de pass mis à jour',
            description: 'Votre mot de passe a bien été mis à jour',
            color: 'success',
        })
    } catch (error: any) {
        if (error.response && error.response._data && error.response._data.description) {
            errorMessage.value = error.response._data.description.join(' et ').toString()
        }
    }
}
</script>
