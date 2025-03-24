<template>
    Page compte
    <br />

    <NuxtLink :to="{ name: 'account-update-id', params: { id: decode.sub } }">modifier</NuxtLink
    ><br />

    <button @click="showDelete">Supp compte</button><br />

    <div v-if="displayDelete">
        Supprimer ? <br />
        <button @click="deleteAccount">Non</button>
        <button @click="deleteAccount">Oui</button>
    </div>

    <button @click="logout">Déconnexion</button>
</template>
<script setup lang="ts">
import decodingJWT from '~/shared/utils/decodingJWT'

const token = useCookie('token')
const decode = decodingJWT(token.value)

const displayDelete = ref<boolean>(false)

const logout = () => {
    return navigateTo('/account/logout')
}

const showDelete = () => {
    displayDelete.value = !displayDelete.value
}

const deleteAccount = () => {
    return navigateTo(`/account/delete/${decode.sub}`)
}
</script>
