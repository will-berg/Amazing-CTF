<template>
  <div class="bg-gray-50 grid grid-cols-3 gap-4">
    <button class="btn btn-outline" :disabled="page === 1" @click="$emit('update:page', --page)">
      Previous
    </button>
    <div class="flex justify-center items-center text-gray-900">
      <span class="font-bold">{{ page }}</span>
      <span>/{{ max_page }}</span>
    </div>
    <button class="btn btn-outline" :disabled="page === max_page" @click="$emit('update:page', ++page)">
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>
const { page, max_page } = defineProps<{
  page: number;
  max_page: number;
}>();

defineEmits(["update:page"]);
</script>
