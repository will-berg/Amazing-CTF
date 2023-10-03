<template>
    <footer
        class="flex justify-center md:gap-60 gap-6 footer p-10 bg-base-300 text-neutral-content"
    >
        <nav>
            <header class="footer-title">Services</header>
            <NuxtLink to="/hacking" class="hover:text-white hover:shadow-md hover:underline"
                >Challenges</NuxtLink
            >
            <NuxtLink to="/leaderboard" class="hover:text-white hover:shadow-md hover:underline"
                >Leaderboards</NuxtLink
            >
        </nav>
        <nav>
            <header class="footer-title">Company</header>
            <NuxtLink to="/about" class="hover:text-white hover:shadow-md hover:underline"
                >About Us</NuxtLink
            >
            <NuxtLink to="/contact" class="hover:text-white hover:shadow-md hover:underline"
                >Contact</NuxtLink
            >
        </nav>
        <nav>
            <header class="footer-title">Legal</header>
            <NuxtLink to="/terms-of-service" class="hover:text-white hover:shadow-md hover:underline"
                >Terms of Service</NuxtLink
            >
            <NuxtLink to="/privacy" class="hover:text-white hover:shadow-md hover:underline"
                >Privacy Policy</NuxtLink
            >
        </nav>
    </footer>
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
            <p>Copyright © {{ year }} AmazingCTF. All rights reserved.</p>
        </div>
    </footer>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();
</script>
