export default defineNuxtRouteMiddleware(( to ) => {
  if (process.client) {
    const user = window.localStorage.getItem('user')

    if(to.path.startsWith('/profile') && !user){
      return navigateTo("/login")
    }
  }
});




