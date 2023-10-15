<template>
  <div v-if="hack" class="max-w-sm rounded overflow-hidden shadow-lg flex flex-col justify-center items-center border-4 border-purple-500">
    <div class="bg-white w-full flex justify-center items-center h-36">
      <NuxtImg
        v-if="hack.imageUrl"
        class="h-2/5 inline-block"
        width="100%"
        :src="hack.imageUrl"
      />
    </div>
    <div class="px-6 py-4 text-center">
      <div class="font-bold text-xl mb-2">{{ hack.title }}</div>
    </div>
    <div class="text-center pb-4">
      <button class="btn btn-secondary rounded-full" @click="$emit('selectedHack', hack)">Read More</button>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { HackDetails } from "@/types";

defineProps<{
  hack: HackDetails | null;
}>();

defineEmits<{
  selectedHack: (hack: HackDetails) => void; 
}>();


</script>


