<template>
    <AppNavbar />
    <div class="p-4">
        <h1 class="text-2xl">Mon compte</h1>
        <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        <USeparator class="mt-4" />
    </div>

    <div class="flex flex-row p-4 gap-12">
        <div class="basis-1/3">
            <UNavigationMenu
                orientation="vertical"
                :items="items"
                class="data-[orientation=vertical]"
            />
        </div>
        <div class="w-full px-4">
            <slot />
        </div>
    </div>
</template>
<script setup lang="ts">
import decodingJWT from '~/shared/utils/decodingJWT'

const token = useCookie('token')
const decode = decodingJWT(token.value)

const items = ref([
    [
        {
            label: 'Profil',
            icon: 'i-lucide-user',
            to: `/account/profile/${decode.sub}`,
        },
        {
            label: 'Paramètres du compte',
            icon: 'i-lucide-settings',
            to: `/account/settings/${decode.sub}`,
        },
        {
            label: 'Sécurité',
            icon: 'i-lucide-shield',
            to: `/account/security/${decode.sub}`,
        },
    ],
])
</script>
