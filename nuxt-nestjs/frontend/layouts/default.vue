<template>
    <div>
        <AppNavbar />
        <div class="p-4">
            <AppBreadcrumb :page-title="pageTitle" />
            <h1 v-if="!isSpecialPage" class="my-2">{{ renameRoute(route.name) }}</h1>
            <div class="my-4"><slot /></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { renameRoute } from '~/shared/utils/handleRoutesName'
const route = useRoute()
</script>
