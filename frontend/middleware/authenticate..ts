import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
  // If the user is not logged in, redirect to login page
  addRouteMiddleware((to) => {
    if (to.path !==  ("/login" || "/register" || "/") && !user.value) {
      return navigateTo("/");
    } else {
      return navigateTo(to.path);
    }
  });
});


