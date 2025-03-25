<template>Déconnexion en cours</template>
<script setup lang="ts">
const token = useCookie('token')
onMounted(() => {
    token.value = null
    setTimeout(() => {
        window.location.assign('/')
    }, 1200)
})
</script>
