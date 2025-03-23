<template>
    <div>
        <input v-model="email" placeholder="email" /><br />
        <input v-model="password" placeholder="password" />
        <button @click="confirm">register</button>
    </div>
</template>
<script setup lang="ts">
import { useMainStore } from '~/stores/main'

const email = ref<string>('')
const password = ref<string>('')
const store = useMainStore()

async function confirm() {
    const token = await $fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        body: { email: email.value, password: password.value },
    })

    store.setLocalStorage('token', token)
    console.log(store.getToken)
}
</script>
