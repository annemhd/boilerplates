<template>
    <div class="flex flex-col gap-2">
        <UButton
            :to="{ name: 'account-settings-update-id', params: { id: id } }"
            color="neutral"
            variant="ghost"
            >Modifier mes informations</UButton
        >
        <UModal v-model:open="displayModal">
            <UButton label="Supprimer mon compte" color="error" variant="soft" />
            <template #content>
                <div class="h-48 m-4">
                    <p>
                        Êtes-vous sûre de vouloir supprimer votre compte ? Cette action est
                        définitive
                    </p>
                    <UButton color="neutral" variant="outline" @click="showModal">Non</UButton>
                    <UButton color="error" @click="deleteAccount">Supprimer mon compte</UButton>
                </div>
            </template>
        </UModal>
    </div>
</template>
<script setup lang="ts">
const route = useRoute()
const id = route.params.id

const displayModal = ref<boolean>(false)

const showModal = () => {
    displayModal.value = !displayModal.value
}

const deleteAccount = () => {
    return navigateTo(`/account/delete/${id}`)
}
</script>
