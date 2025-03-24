<template>
    <UBreadcrumb v-if="!isSpecialPage" :items="breadcrumbItems" />
</template>
<script setup lang="ts">
const route = useRoute()
const props = defineProps(['pageTitle'])

const isSpecialPage = computed(() => {
    if (typeof route.name === 'string') {
        return ['index', 'authentication-signin', 'authentication-signup'].some((substring) =>
            (route.name as string).includes(substring)
        )
    }
    return false
})

const breadcrumbItems = computed(() => {
    const baseItems = [
        {
            label: 'Accueil',
            to: '/',
        },
    ]

    if (
        route.name === 'authentication-signup' ||
        route.name === 'authentication-signin' ||
        route.name === 'account' ||
        route.name === 'account-settings-id' ||
        route.name === 'account-update-id'
    ) {
        return [...baseItems, { label: props.pageTitle }]
    }

    if (route.name === 'some-component') {
        return [
            ...baseItems,
            { label: 'Composants', to: '/components' },
            { label: 'Breadcrumb', to: '/components/breadcrumb' },
            { label: props.pageTitle },
        ]
    }

    return baseItems // Default breadcrumb for other routes
})
</script>
