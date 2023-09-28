<template>
  <div class="bg-gray-50 grid grid-cols-3 gap-4">
    <button class="btn btn-outline" :disabled="page === 1" @click="page--">
      Previous
    </button>
    <div class="flex justify-center items-center text-gray-900">
      <span class="font-bold">{{ page }}</span>
      <span>/{{ maxPage }}</span>
    </div>
    <button class="btn btn-outline" :disabled="page === maxPage" @click="page++">
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>
const { page, maxPage } = defineProps({
  page: {
    type: Number,
    required: true,
  },
  maxPage: {
    type: Number,
    required: true,
  },
});
</script>