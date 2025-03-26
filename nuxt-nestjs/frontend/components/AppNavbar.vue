<template>
    <UNavigationMenu :items="navigationItems" color="neutral" highlight></UNavigationMenu>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import decodingJWT from '~/shared/utils/decodingJWT'

const token = useCookie('token')
const decode = decodingJWT(token.value)
const route = useRoute()

const accountRoutes = {
    index: `/account/profile/${decode?.sub}`,
    'account-profile-id': `/account/profile/${decode?.sub}`,
    'account-settings-id': `/account/settings/${decode?.sub}`,
    'account-security-id': `/account/security/${decode?.sub}`,
    'account-security-password-id': `/account/security/password/${decode?.sub}`,
}

const navigationItems = computed(() => {
    const items: NavigationMenuItem[] = [{ label: 'Accueil', icon: 'i-lucide-house', to: '/' }]

    if (token.value && decode) {
        items.push(
            {
                label: 'Mon compte',
                icon: 'i-lucide-user',
                to: accountRoutes[route.name as keyof typeof accountRoutes],
            },
            { label: 'Déconnexion', icon: 'i-lucide-log-out', to: '/authentication/logout' }
        )
    } else {
        items.push(
            { label: 'Se connecter', to: '/authentication/signin' },
            { label: "S'inscrire", to: '/authentication/signup' }
        )
    }

    return items
})
</script>
