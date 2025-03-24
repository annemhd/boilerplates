<template>Suppression du compte en cours</template>
<script setup lang="ts">
import { deleteUser } from '~/services/users.service'

const route = useRoute()
const id = route.params.id

onMounted(async () => {
    const token = useCookie('token')
    await deleteUser(id)
    token.value = null
    setTimeout(() => {
        window.location.assign('/')
    }, 1000)
})
</script>
