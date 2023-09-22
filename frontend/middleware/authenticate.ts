export default defineNuxtRouteMiddleware(async (to, from) => {
    const currentUser = await getCurrentUser()

    //with this we can restrict access to routes
    if(!currentUser){
        return navigateTo('/login')
    }
}
)