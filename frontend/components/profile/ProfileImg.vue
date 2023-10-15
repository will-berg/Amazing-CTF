<template>
    <div @click="$emit('openUploadProfileImage')"> 
        <NuxtImg
            v-if="image"
            class="bg-white rounded-full"
            width="256"
            height="150"
            :src="image"
          />
    </div>
  </template>
  <script lang="ts" setup>
  defineProps<{
    image: string,
  }>();
  defineEmits<{
    openUploadProfileImage: []
  }>();
</script>

<style scoped>
</style>