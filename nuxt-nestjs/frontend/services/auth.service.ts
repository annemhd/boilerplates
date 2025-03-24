export const authentication = async (payload: any) => {
        return await $fetch('http://localhost:3001/authentication/signin', {
            method: 'POST',
            body: { email: payload.email, password: payload.password },
        })  
}
        
export default { authentication }