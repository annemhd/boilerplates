
export const getUser = async (id: any) => {
    const token: any = useCookie('token')
    return await $fetch(`http://localhost:3001/users/${id}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token.value}` },
    })
}

export const updateUser = async (id: any, payload: any) => {
    const token: any = useCookie('token')
    return await $fetch(`http://localhost:3001/users/${id}`, {
        method: 'PATCH',
        body: { username: payload.username, email: payload.email, password: payload.password },
        headers: { Authorization: `Bearer ${token.value}` },
    })
}

export default {updateUser, getUser}