<template>
    <footer class="flex justify-center md:gap-60 footer p-8 bg-base-300">
        <nav>
            <header class="footer-title">Services</header>
            <NuxtLink to="/challenges" class="hover:shadow-md hover:underline"
                >Challenges</NuxtLink
            >
            <NuxtLink to="/leaderboard" class="hover:shadow-md hover:underline"
                >Leaderboards</NuxtLink
            >
        </nav>
        <nav>
            <header class="footer-title">Company</header>
            <NuxtLink to="/about" class="hover:shadow-md hover:underline">About Us</NuxtLink>
            <NuxtLink to="/contact" class="hover:shadow-md hover:underline">Contact</NuxtLink>
        </nav>
        <nav>
            <header class="footer-title">Legal</header>
            <NuxtLink to="/terms-of-service" class="hover:shadow-md hover:underline"
                >Terms of Service</NuxtLink
            >
            <NuxtLink to="/privacy" class="hover:shadow-md hover:underline"
                >Privacy Policy</NuxtLink
            >
        </nav>
    </footer>
    <footer class="footer footer-center p-2 bg-base-300 text-base-content">
        <div>
            <p>Copyright © {{ year }} AmazingCTF. All rights reserved.</p>
        </div>
    </footer>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();
</script>
