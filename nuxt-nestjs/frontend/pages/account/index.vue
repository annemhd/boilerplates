<template>
    <template>Page compte</template>

    <button @click="logout()">Déconnexion</button>
</template>
<script setup lang="ts">
const logout = () => {
    navigateTo('/account/logout')
}
</script>
