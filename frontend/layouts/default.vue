<template>
  <div class="flex min-h-screen flex-col px-3 pt-3" :data-theme="theme">
    <NavBar />
    <div class="flex flex-grow flex-col md:flex-row">
      <main class="container mx-auto p-4">
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

// Might be able to use pinia-plugin-persistedstate instead for userStore
useUserStore().initUserFromLocalStorage();
const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);
</script>
