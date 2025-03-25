<template>
    <div>
        <AppNavbar />
        <div class="p-4">
            <h1 class="text-4xl my-2">{{ renameRoute(route.name) }}</h1>
            <div class="my-4"><slot /></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { renameRoute } from '~/shared/utils/handleRoutesName'
const route = useRoute()
</script>
