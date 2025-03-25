<template>
    <AppNavbar />
    <h1 v-if="!isSpecialPage" class="text-4xl my-2 p-4">{{ renameRoute(route.name) }}</h1>
    <div class="flex flex-row p-4">
        <div class="basis-1/4 bg-slate-800 rounded-2xl p-6">
            <UNavigationMenu
                orientation="vertical"
                :items="items"
                class="data-[orientation=vertical]"
            />
        </div>
        <div class="w-full p-14"><slot /></div>
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
