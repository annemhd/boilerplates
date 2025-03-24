<template>
    <UBreadcrumb v-if="!isSpecialPage" :items="breadcrumbItems" />
</template>
<script setup lang="ts">
import { renamePath } from '~/shared/utils/handleRoutesName'

const route = useRoute()

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

    if (!route.path || route.path === '/') {
        return baseItems
    }

    const pathSegments = route.path.split('/').filter((segment) => segment)
    const breadcrumb = [...baseItems]

    let currentPath = '/'

    pathSegments.forEach((segment) => {
        if (
            !/^\d+$/.test(segment) &&
            !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment)
        ) {
            currentPath += segment + '/'
            breadcrumb.push({
                label: renamePath(segment),
                to: currentPath,
            })
        } else {
            currentPath += segment + '/'
        }
    })

    return breadcrumb
})
</script>
