<template>
    <div class="flex flex-row p-4 h-screen">
        <div class="basis-1/3 p-14"><slot /></div>
        <div class="basis-2/3 bg-slate-800 rounded-2xl p-6">
            <UButton v-if="!isLogout" to="/" variant="soft">Retour à l'accueil</UButton>
        </div>
    </div>
</template>
<script setup lang="ts">
const route = useRoute()
const isLogout = computed(() => route.name === 'authentication-logout')
</script>
