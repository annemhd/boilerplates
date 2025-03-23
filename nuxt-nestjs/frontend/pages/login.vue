<template>
    <div>
        {{ loading }}
        <input v-model="email" placeholder="email" /><br />
        <input v-model="password" placeholder="password" />
        <button @click="confirm()">login</button>
    </div>
</template>
<script setup lang="ts">
const loading = ref<boolean>(false)
const email = ref<string>('')
const password = ref<string>('')
const token = useCookie('token')

const confirm = async () => {
    try {
        const response = await $fetch('http://localhost:3001/authentication/signin', {
            method: 'POST',
            body: { email: email.value, password: password.value },
        })

        token.value = response.access_token
        loading.value = true
    } catch (error) {
        console.log(error)
    } finally {
        if (token) {
            setTimeout(() => {
                window.location.assign('/account')
            }, 1000)
        }
    }
}
</script>
