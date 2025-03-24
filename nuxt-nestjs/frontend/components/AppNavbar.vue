<template>
    <nav>
        <NuxtLink to="/">Accueil</NuxtLink>
        <NuxtLink to="/authentication/signup">S'inscrire</NuxtLink>
        <NuxtLink to="/authentication/signin">S'identifier</NuxtLink>
        <button @click="logout">Déconnexion</button>
    </nav>
</template>
<script setup lang="ts">
const token = useCookie('token')

const logout = () => {
    return navigateTo('/account/logout')
}
</script>
