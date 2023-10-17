<template>
  <div @click="$emit('openUploadProfileImage')" class="relative group">
    <NuxtImg v-if="image" class="bg-white rounded-full shadow-2xl" width="256" height="150" :src="image" />
    <div
      class="hidden group-hover:block absolute inset-0 text-white bg-black bg-opacity-50 transition-opacity rounded-full">
      <div class="flex items-center justify-center h-full">
        <p class="text-xl font-bold">Edit</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  image: string,
}>();

defineEmits<{
  (event: "openUploadProfileImage"): void;
}>();
</script>

<style scoped></style>