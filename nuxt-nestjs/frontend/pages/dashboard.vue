<template>
    Welcome to your dashboard <br />

    <button @click="logout()">deco</button>
</template>
<script setup lang="ts">
const logout = () => {
    navigateTo('/logout')
}
</script>
