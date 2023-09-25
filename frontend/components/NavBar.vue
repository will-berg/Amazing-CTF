<template>
    <div
        class="navbar rounded-lg bg-gray-800 text-white flex items-center justify-between p-4"
    >
        <div class="flex-1 flex-grow">
            <NuxtLink to="/" class="btn btn-ghost normal-case text-xl text-white">{{
                title
            }}</NuxtLink>
        </div>
        <div>
            <NuxtLink to="/cat" class="btn btn-ghost normal-case text-xl text-white"
                >Cat Facts</NuxtLink
            >
        </div>
        <div class="dropdown dropdown-bottom dropdown-end">
            <!-- Could conditionally render profile picture here if we implement it -->
            <label tabindex="0" class="btn btn-circle"
                ><Icon name="line-md:account" size="24"
            /></label>
            <!-- Profile and logout (could probably be a function tbh) pages yet to be added -->
            <ul
                tabindex="0"
                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
                <li v-if="user">
                    <NuxtLink to="/logout"
                        ><Icon name="material-symbols:logout" /> Logout</NuxtLink
                    >
                </li>
                <li v-else>
                    <NuxtLink to="/login"
                        ><Icon name="material-symbols:login" /> Login</NuxtLink
                    >
                </li>
                <li v-if="user">
                    <NuxtLink to="/profile"
                        ><Icon name="material-symbols:account-circle" /> Profile</NuxtLink
                    >
                </li>
                <li v-else>
                    <NuxtLink to="/register"
                        ><Icon name="mdi:account-add" /> Register</NuxtLink
                    >
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        default: "AmazingCTF",
    },
});

const userStore = useUserStore();
const user = ref(userStore.user);
</script>
