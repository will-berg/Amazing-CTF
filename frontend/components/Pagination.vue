<template>
  <div class="grid grid-cols-3 gap-4 bg-base-200">
    <button class="btn btn-outline" :disabled="page === 1" @click="$emit('update:page', page - 1)">
      Previous
    </button>
    <div class="flex justify-center items-center">
      <span class="font-bold">{{ page }}</span>
      <span>/{{ max_page }}</span>
    </div>
    <button class="btn btn-outline" :disabled="page === max_page" @click="$emit('update:page', page + 1)">
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  page: number;
  max_page: number;
}>();

defineEmits(["update:page"]);
</script>
