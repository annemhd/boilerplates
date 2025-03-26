<template>
    <nav class="flex p-4">
        <UNavigationMenu
            :arrow="true"
            :items="navigationItems"
            content-orientation="vertical"
            class="flex-1"
        />
        <div class="grow-2"></div>
        <UNavigationMenu
            v-if="token"
            trailing-icon="i-lucide-chevron-down"
            :items="navigationItemsLogged"
            content-orientation="vertical"
            :ui="{ viewportWrapper: 'block', indicator: 'invisible bg-red-300' }"
            class="flex-none"
        />
        <div v-else class="flex gap-2">
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

const navigationItems = computed(() => {
    return [
        { label: 'Accueil', icon: 'i-lucide-house', to: '/' },
        { label: 'Articles', icon: 'i-lucide-database', to: '/posts' },
    ]
})

const navigationItemsLogged = computed(() => {
    const items: NavigationMenuItem[] = []

    if (token.value && decode) {
        items.push({
            label: '',
            icon: 'i-lucide-user-round',
            children: [
                {
                    label: 'Mon profil',
                    icon: 'i-lucide-user-round',
                    to: `/profile`,
                    slot: 'logout',
                },
                {
                    label: 'Mon compte',
                    icon: 'i-lucide-settings',
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
