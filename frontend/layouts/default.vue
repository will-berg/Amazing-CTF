<template>
  <div class="flex min-h-screen flex-col px-3 pt-3">
    <NavBar />
    <main class="container mx-auto bg-white p-4">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup></script>
