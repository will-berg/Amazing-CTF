export default defineNuxtRouteMiddleware(( to ) => {
  if (process.client) {
    const MUST_BE_LOGGED_IN = ['/profile'];
    
    if (MUST_BE_LOGGED_IN.some(path => to.path.startsWith(path)) && !localStorage.getItem('user')) {
      return navigateTo('/login', { redirectCode: 301 });
    }
  }
});




