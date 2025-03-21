<template>
    <div>
        <input v-model="email" placeholder="email" /><br />
        <input v-model="password" placeholder="password" />
        <button @click="confirm">register</button>
    </div>
</template>
<script setup lang="ts">
const email = ref<string>('')
const password = ref<string>('')

async function confirm() {
    await $fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        body: { email: email.value, password: password.value },
    })
}
</script>
