export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token')

  if (token.value !== undefined) {
  if (to.path === '/register') return navigateTo('/dashboard')
  if (to.path === '/login') return navigateTo('/dashboard')
  } 

  if (to.path === '/dashboard') {
    if (token.value === undefined) return navigateTo('/')
  }
})