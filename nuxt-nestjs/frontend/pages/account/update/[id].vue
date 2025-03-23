<template>
    Page màj compte

    {{ token?.access_token }}
    <div>
        <input v-model="email" placeholder="email" /><br />
        <input v-model="username" placeholder="username" /><br />
        <input v-model="password" placeholder="password" /><br />
        <button @click="confirm()">S'identifier</button><br />
        <NuxtLink to="/">Retour</NuxtLink>
    </div>
</template>
<script setup lang="ts">
const route = useRoute()
const token: any = useCookie('token')
const id = route.params.id

const email = ref<string>('')
const username = ref<string>('')
const password = ref<string>('')

async function confirm() {
    return await $fetch(`http://localhost:3001/users/${id}`, {
        method: 'PATCH',
        body: { username: username.value, email: email.value, password: password.value },
        headers: { Authorization: `Bearer ${token.value}` },
    })
}
</script>
