<template>
    <div>
        <input v-model="email" placeholder="email" /><br />
        <input v-model="username" placeholder="username" /><br />
        <input v-model="password" placeholder="password" />
        <button @click="confirm">register</button>
    </div>
</template>
<script setup lang="ts">
const email = ref<string>('')
const username = ref<string>('')
const password = ref<string>('')

async function confirm() {
    await $fetch('http://localhost:3001/users', {
        method: 'POST',
        body: { username: username.value, email: email.value, password: password.value },
    })
}
</script>
