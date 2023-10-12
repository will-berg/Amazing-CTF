<template>
  <div class="bg-gray-50 grid grid-cols-3 gap-4">
    <button
      class="btn btn-outline"
      :disabled="page === 1"
      @click="
        page--;
        $emit('update:page', page);
      "
    >
      Previous
    </button>
    <div class="flex justify-center items-center text-gray-900">
      <span class="font-bold">{{ page }}</span>
      <span>/{{ max_page }}</span>
    </div>
    <button
      class="btn btn-outline"
      :disabled="page === max_page"
      @click="
        page++;
        $emit('update:page', page);
      "
    >
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>
const { page, max_page } = defineProps({
  page: {
    type: Number,
    required: true,
  },
  max_page: {
    type: Number,
    required: true,
  },
});

defineEmits(["update:page"]);
</script>
