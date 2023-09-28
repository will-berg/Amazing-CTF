<template>
  <div class="flex min-h-screen flex-col px-3 pt-3">
    <NavBar />
    <div class="flex flex-grow flex-col md:flex-row">
      <main class="bg-white p-4 w-full">
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup></script>
