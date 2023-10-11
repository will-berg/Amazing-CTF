<template>
  <div v-if="hack" class="card w-64 h-[20rem] bg-base-100 shadow-xl">
    <figure class="relative bg-white">
  <NuxtImg
    v-if="hack.imageUrl"
    class="bg-white h-3/5"
    width="100%"
    :src="hack.imageUrl"
  />
  <div class="absolute inset-0 border-8 border-purple-500 animate-pulse"></div>
</figure>
    <div class="card-body flex flex-col justify-between">
      <div>
        <h2 class="card-title">{{ hack.title }}</h2>
      </div>
      <div class="card-actions flex justify-center items-center h-16">
        <button class="btn btn-secondary rounded-full" @click="$emit('selectedHack', hack)">Read More</button>
      </div>
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
