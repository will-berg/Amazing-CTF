<template>
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
            <p>Copyright © {{ year }} AmazingCTF. All rights reserved.</p>
            <NuxtLink to="/about" class="font-semibold hover:text-white hover:shadow-md hover:underline">About Us</NuxtLink>
            <NuxtLink to="/privacy" class="font-semibold hover:text-white hover:shadow-md hover:underline">Privacy Policy</NuxtLink>
        </div>
    </footer>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();
</script>
