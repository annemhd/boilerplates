<template>
    <UApp>
        <NuxtLayout NuxtLayout :name="layoutName">
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
<script setup lang="ts">
const route = useRoute()

const layoutName = computed(() => {
    switch (route.name) {
        case 'index':
            return 'home'
        case 'authentication-signup':
            return 'auth'
        case 'authentication-signin':
            return 'auth'
        default:
            return 'default'
    }
})
</script>
