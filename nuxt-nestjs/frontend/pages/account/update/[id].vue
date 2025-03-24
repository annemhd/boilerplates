<template>
    Page màj compte

    <div>
        <input v-model="email" placeholder="email" /><br />
        <input v-model="username" placeholder="username" /><br />
        <input v-model="password" placeholder="password" /><br />
        <button @click="validate()">S'identifier</button><br />
        <button @click="router.back()">Retour</button>
    </div>
</template>
<script setup lang="ts">
import { getUser, updateUser } from '~/services/users.service'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const user = ref()

const email = ref<string>('')
const username = ref<string>('')
const password = ref<string>('')

onMounted(async () => {
    await retriveCurrentUser()
    email.value = user.value.email
    username.value = user.value.username
})

const validate = async () => {
    await updateUser(id, { username: username.value, email: email.value, password: password.value })
}

const retriveCurrentUser = async () => {
    user.value = await getUser(id)
}
</script>
