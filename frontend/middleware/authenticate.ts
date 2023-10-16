import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);

  if (!user) {
    return navigateTo('/login');
  }
});



