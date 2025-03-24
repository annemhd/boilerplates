<template>
    <nav class="flex gap-2 p-4">
        <UButton color="neutral" variant="ghost" to="/">Accueil</UButton>
        <div v-if="token" class="flex gap-2">
            <UButton color="neutral" variant="ghost" to="/account">Mon compte</UButton>
            <UButton color="error" variant="ghost" class="cursor-pointer" @click="logout"
                >Déconnexion</UButton
            >
        </div>
        <div v-else class="flex gap-2">
            <UButton color="neutral" variant="ghost" to="/authentication/signin"
                >Se connecter</UButton
            >
            <UButton to="/authentication/signup">S'inscrire</UButton>
        </div>
    </nav>
</template>
<script setup lang="ts">
const token = useCookie('token')

const logout = () => {
    return navigateTo('/account/logout')
}
</script>
