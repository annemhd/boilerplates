<template>
    <AppNavbar />

    <div class="flex flex-row p-4 gap-12">
        <div class="basis-1/3">
            <h1 class="text-4xl mb-4">Mon compte</h1>
            <UNavigationMenu
                orientation="vertical"
                :items="items"
                class="data-[orientation=vertical]"
            />
        </div>
        <div class="w-full px-4">
            <h2 class="text-4xl my-2">{{ renameRoute(route.name) }}</h2>
            <slot />
        </div>
    </div>
</template>
<script setup lang="ts">
import decodingJWT from '~/shared/utils/decodingJWT'
import { renameRoute } from '~/shared/utils/handleRoutesName'

const route = useRoute()
const token = useCookie('token')
const decode = decodingJWT(token.value)

const items = ref([
    [
        {
            label: 'Profil',
            to: `/account/profile/${decode.sub}`,
        },
        {
            label: 'Paramètres du compte',
            to: `/account/settings/${decode.sub}`,
        },
    ],
])
</script>
