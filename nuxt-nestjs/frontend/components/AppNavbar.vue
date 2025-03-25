<template>
    <nav class="flex gap-2 p-4">
        <UButton color="neutral" variant="ghost" to="/" active-color="primary" active-variant="soft"
            >Accueil</UButton
        >
        <div v-if="token" class="flex gap-2">
            <UButton
                color="neutral"
                variant="ghost"
                :to="{ name: 'account-profile-id', params: { id: decode.sub } }"
                >Mon compte</UButton
            >
            <UButton color="error" variant="ghost" class="cursor-pointer" @click="logout()"
                >Déconnexion</UButton
            >
        </div>
        <div v-else class="flex gap-2">
            <UButton color="neutral" variant="ghost" to="/authentication/signin"
                >Se connecter</UButton
            >
            <UButton to="/authentication/signup">S'inscrire</UButton>
        </div>
    </nav>
</template>
<script setup lang="ts">
import decodingJWT from '~/shared/utils/decodingJWT'

const token = useCookie('token')
const decode = decodingJWT(token.value)

const logout = () => {
    return navigateTo('/authentication/logout')
}
</script>
