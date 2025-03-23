<template>
    Page compte
    <br />

    <NuxtLink :to="{ name: 'account-update-id', params: { id: decode.sub } }">modifier</NuxtLink>

    <button @click="logout">Déconnexion</button>
</template>
<script setup lang="ts">
import decodingJWT from '~/shared/utils/decodingJWT'

const token = useCookie('token')
const decode = decodingJWT(token.value)

const logout = () => {
    return navigateTo('/account/logout')
}
</script>
