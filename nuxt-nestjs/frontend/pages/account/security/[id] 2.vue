<template>
    <div class="flex justify-between items-end">
        <div>
            <h2 class="text-xl font-bold">Mot de passe</h2>
            <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        <div>
            <UButton
                :to="{ name: 'account-security-password-id', params: { id: id } }"
                class="inline-block"
                >Modifier mon mot de passe</UButton
            >
        </div>
    </div>
</template>
<script setup lang="ts">
const route = useRoute()
const id = route.params.id
</script>
