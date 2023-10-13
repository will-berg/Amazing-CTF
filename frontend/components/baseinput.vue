<template>
    <input v-model="text" :type="type" :placeholder="placeholder" class="input input-bordered w-full max-w-xs" />
</template>

<script setup lang="ts">
const { text } = defineModels<{
    text: string,
}>()
const { type, placeholder } = defineProps<{
  type: string;
  placeholder: string;
}>();
</script>