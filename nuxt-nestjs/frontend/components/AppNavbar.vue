<template>
    <nav class="flex items-center p-4">
        <UNavigationMenu :arrow="false" :items="navigationItems" content-orientation="vertical" />
        <div class="flex w-full"></div>
        <UNavigationMenu
            :arrow="false"
            :items="navigationItemsLogged"
            class="p-4"
            content-orientation="vertical"
        />
        <div class="flex gap-2">
            <UButton to="/authentication/signin" variant="soft" class="h-fit w-28"
                >Se connecter</UButton
            >
            <UButton to="/authentication/signup" class="h-fit w-fit">S'inscrire</UButton>
        </div>
    </nav>
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
    return [{ label: 'Accueil', icon: 'i-lucide-house', to: '/' }]
})

const navigationItemsLogged = computed(() => {
    const items: NavigationMenuItem[] = []

    if (token.value && decode) {
        items.push({
            label: 'Mon compte',
            icon: 'i-lucide-user',
            to: accountRoutes[route.name as keyof typeof accountRoutes],
            children: [
                {
                    label: 'Mon profil',
                    icon: 'i-lucide-user',
                    to: `/account/profile/${decode?.sub}`,
                    slot: 'logout',
                },
                {
                    label: 'Déconnexion',
                    icon: 'i-lucide-log-out',
                    to: '/authentication/logout',
                    slot: 'logout',
                },
            ],
        })
    }

    return items
})
</script>
