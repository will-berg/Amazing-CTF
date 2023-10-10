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
// Store persistence
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(() => {
    if (localStorage.getItem("theme")) {
        theme.value = JSON.parse(localStorage.getItem("theme")!);
    }
    if (localStorage.getItem("user")) {
        user.value = JSON.parse(localStorage.getItem("user")!);
    }
});

watch(theme, (themeVal) => {
    localStorage.setItem("theme", JSON.stringify(themeVal));
});

watch(user, (userVal) => {
    localStorage.setItem("user", JSON.stringify(userVal));
});
</script>
