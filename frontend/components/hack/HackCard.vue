<template>
    <div v-if="hack" class="max-w-sm rounded overflow-hidden shadow-lg flex flex-col h-full">
      <NuxtImg
        class="bg-white"
        width="256"
        height="150"
        :src="hack.imageUrl"
        :preload="true"
      />
      <div class="px-6 py-4 flex-grow">
        <div class="font-bold text-xl mb-2">{{ hack.title }}</div>
        <p class="text-gray-700 text-base flex-grow">
          {{ hack.description }}
        </p>
      </div>
      <div class="flex justify-center items-end p-4">
        <NuxtLink :to="'hackInfo/' + hack.name">
            <button class="btn btn-info hover:bg-blue-600 transition-bg ease-in-out duration-200">Select</button>
        </NuxtLink>
    </div>
    </div>
  </template>

<script lang="ts" setup>
import type { HackDetails } from "@/types";

const props = defineProps<{
  hack: HackDetails | null;
}>();
</script>