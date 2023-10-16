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
      <div class="font-bold text-xl mb-2">{{ hack.title }}
        <span v-if="isCompleted" class="text-green-500 ml-2">&#10003;</span>
      </div>
    </div>
    <div class="text-center pb-4">
      <button class="btn btn-secondary rounded-full" @click="$emit('selectedHack', hack)">Read More</button>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { HackDetails } from "@/types";
import { storeToRefs } from "pinia";

// const userStore = useUserStore();
// const { user } = storeToRefs(userStore);

const props = defineProps<{
  hack: HackDetails | null;
  isCompleted: boolean
}>();

defineEmits<{
  selectedHack: (hack: HackDetails) => void; 
}>();


</script>


