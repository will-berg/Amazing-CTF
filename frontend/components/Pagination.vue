<template>
  <div class="grid grid-cols-3 gap-4 bg-base-200">
    <button class="btn btn-outline" :disabled="page === 1" @click="$emit('update:page', page - 1)">
      Previous
    </button>
    <div class="flex justify-center items-center">
      <input class="input bg-base-200 w-20 text-center hover:border-red-500 hover:border-spacing-1" type="number" min="1"
        :max="max_page" :value="page" @input="$emit('update:page', limit(($event.target as HTMLInputElement).value))">
      <!-- Horizontal line -->
      <div class="border-l-2 border-gray-500 h-full px-6"></div>
      <div class="text-center pr-6">{{ max_page }}</div>
    </div>
    <button class="btn btn-outline" :disabled="page === max_page" @click="$emit('update:page', page + 1)">
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>
const { page, max_page } = defineProps<{
  page: number;
  max_page: number;
}>();

function limit(value: string): number {
  const num = parseInt(value);
  if (Number.isNaN(num) || num < 1) return 1;
  if (num > max_page) return max_page;
  return num;
}

defineEmits<{
  (event: "update:page", page: number): void;
}>();
</script>
