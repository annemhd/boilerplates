<template>
    <UApp :toaster="{ position: 'top-right' }">
        <NuxtLayout NuxtLayout :name="layoutName">
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
<script setup lang="ts">
const route = useRoute()

const layoutName = computed(() => {
    if (!route.name) {
        return 'default'
    }

    switch (route.name) {
        case 'index':
            return 'home'
        default:
            if (route.name.startsWith('authentication')) {
                return 'auth'
            } else if (route.name.startsWith('account')) {
                return 'account'
            }
            return 'default'
    }
})
</script>
