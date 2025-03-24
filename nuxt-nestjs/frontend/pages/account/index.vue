<template>
    <h1>Mon compte</h1>
    <div class="flex flex-col">
        <UButton
            :to="{ name: 'account-settings-id', params: { id: decode.sub } }"
            color="neutral"
            variant="outline"
            >Paramètres du compte</UButton
        >
    </div>
</template>
<script setup lang="ts">
import decodingJWT from '~/shared/utils/decodingJWT'

const token = useCookie('token')
const decode = decodingJWT(token.value)
</script>
