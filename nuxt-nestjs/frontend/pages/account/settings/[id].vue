<template>
    <h1>Paramètre du compte</h1>
    <div class="flex flex-col">
        <UButton
            :to="{ name: 'account-update-id', params: { id: id } }"
            color="neutral"
            variant="outline"
            >Modifier mes informations</UButton
        >
        <UModal v-model:open="displayModal">
            <UButton label="Supprimer mon compte" color="neutral" variant="subtle" />
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
