<template>
  <div class="join grid grid-flow-col gap-0.5">
    <button class="join-item btn btn-outline" :disabled="page === 1" @click="$emit('update:page', page - 1)">«</button>
    <div class="join-item flex justify-center items-center">
      <input class="input bg-base-200 w-16 text-center hover:border-red-500 hover:border-spacing-1" type="number" min="1"
        :max="max_page" :value="page" @input="$emit('update:page', limit(($event.target as HTMLInputElement).value))">
      <div class="border-l-2 border-gray-500 h-full mx-0.5"></div>
      <div class="text-center w-16">{{ max_page }}</div>
    </div>
    <button class="join-item btn btn-outline" :disabled="page === max_page"
      @click="$emit('update:page', page + 1)">»</button>
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
