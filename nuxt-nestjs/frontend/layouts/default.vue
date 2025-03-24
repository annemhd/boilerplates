<template>
    <div>
        <AppNavbar />
        <div class="p-4">
            <AppBreadcrumb :page-title="pageTitle" />
            <h1 v-if="!isSpecialPage" class="my-2">{{ pageTitle }}</h1>
            <div class="my-4"><slot /></div>
        </div>
    </div>
</template>
<script setup lang="ts">
const route = useRoute()

const pageTitle = computed(() => {
    switch (route.name) {
        case 'index':
            return 'Accueil'
        case 'authentication-signup':
            return "S'inscrire"
        case 'authentication-signin':
            return 'Se connecter'
        case 'account':
            return 'Mon compte'
        default:
            return 'Sans titre'
    }
})
</script>
