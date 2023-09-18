<template>
  <div class="navbar rounded-lg bg-gray-800 text-white flex items-center justify-between p-4">
    <div class="flex-1 flex-grow">
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl text-white">{{
        title
      }}</NuxtLink>
    </div>
    <div>
      <NuxtLink to="/cat" class="btn btn-ghost normal-case text-xl text-white">Cat Facts</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: "AmazingCTF"
  },
});
</script>
