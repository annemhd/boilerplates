export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token')

  const authenticatedRoutes = ['/account', '/account/logout', '/account/update', '/account/delete'];
  const unauthenticatedRoutes = ['/authentication/signup', '/authentication/signin'];

  if (token.value) {
    if (unauthenticatedRoutes.includes(to.path)) {
      return navigateTo('/account');
    }
  } else {
    if (authenticatedRoutes.includes(to.path)) {
      return navigateTo('/');
    }
  }
})
