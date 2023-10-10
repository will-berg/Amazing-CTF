<template>
    <div
        class="navbar rounded-lg bg-gray-800 text-white flex items-center justify-between p-4 space-x-4"
    >
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
                <NuxtLink to="/hacking" class="btn btn-ghost normal-case text-xl text-white"
                    >Challenges</NuxtLink
                >
            </div>
            <div>
                <NuxtLink
                    to="/leaderboard"
                    class="btn btn-ghost normal-case text-xl text-white"
                    >Leaderboards</NuxtLink
                >
            </div>
        </div>
        <!-- Hamburger menu with navbar links for smaller screens -->
        <div class="dropdown dropdown-end sm:hidden">
            <label tabindex="0" class="btn btn-ghost btn-circle">
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
                <li><NuxtLink to="/challenges">Challenges</NuxtLink></li>
                <li><NuxtLink to="/leaderboard">Leaderboards</NuxtLink></li>
            </ul>
        </div>
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
                    <a @click="userStore.logout()"
                        ><Icon name="material-symbols:logout" /> Logout</a
                    >
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

defineProps({
    title: {
        type: String,
        default: "AmazingCTF",
    },
});

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>
