<template>
    <div class="navbar rounded-lg bg-gray-800 flex items-center justify-between p-4 space-x-4">
        <div class="flex-1 flex-grow">
            <NuxtLink to="/" class="btn btn-ghost normal-case text-xl text-white">
                <!-- Random logo -->
                <Icon name="simple-icons:cyberdefenders" size="24" />
                {{ title }}</NuxtLink
            >
        </div>
        <!-- Navbar links -->
        <div class="hidden sm:flex">
            <div>
                <NuxtLink
                    to="/challenges"
                    class="btn btn-ghost normal-case text-xl text-white hover:text-accent"
                    >Challenges</NuxtLink
                >
            </div>
            <div>
                <NuxtLink
                    to="/leaderboard"
                    class="btn btn-ghost normal-case text-xl text-white hover:text-accent"
                    >Leaderboards</NuxtLink
                >
            </div>
        </div>
        <!-- Hamburger menu with navbar links for smaller screens -->
        <div class="dropdown dropdown-end sm:hidden">
            <label tabindex="0" class="btn btn-ghost btn-circle text-white">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block w-5 h-5 stroke-current"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                </svg>
            </label>
            <ul
                tabindex="0"
                class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
                <li>
                    <NuxtLink to="/challenges"
                        ><Icon name="game-icons:laptop" /> Challenges</NuxtLink
                    >
                </li>
                <li>
                    <NuxtLink to="/leaderboard"
                        ><Icon name="ic:round-leaderboard" /> Leaderboards</NuxtLink
                    >
                </li>
            </ul>
        </div>
        <!-- Dark/light mode toggle -->
        <label class="swap swap-rotate text-white">
            <input type="checkbox" @click="themeStore.toggleTheme()" />
            <!-- sun icon -->
            <svg
                class="swap-on fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path
                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                />
            </svg>
            <!-- moon icon -->
            <svg
                class="swap-off fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path
                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                />
            </svg>
        </label>
        <!-- Profile related links -->
        <div class="dropdown dropdown-bottom dropdown-end">
            <!-- Could conditionally render profile picture here if we implement it -->
            <label tabindex="0" class="btn btn-circle"
                ><Icon name="line-md:account" size="24"
            /></label>
            <ul
                tabindex="0"
                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
                <li v-if="user">
                    <a @click="logout()"><Icon name="material-symbols:logout" /> Logout</a>
                </li>
                <li v-else>
                    <NuxtLink to="/login"
                        ><Icon name="material-symbols:login" /> Login</NuxtLink
                    >
                </li>
                <li v-if="user">
                    <NuxtLink :to="'/profile/' + user.username"
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
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
    title: {
        type: String,
        default: "AmazingCTF",
    },
});

const logout = () => {
    userStore.logout();
    router.push("/");
};

const userStore = useUserStore();
const themeStore = useThemeStore();
const { user } = storeToRefs(userStore);
</script>
