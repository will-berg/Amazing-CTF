<template>
  <footer class="footer footer-center p-4 bg-base-300 text-base-content">
    <div>
      <p>Copyright © {{ year }} - All right reserved by Group5 - DH2643</p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();
</script>
