<template>logout</template>
<script setup lang="ts">
const token = useCookie('token')
onMounted(() => {
    token.value = null
    window.location.assign('/')
})
</script>
