<template>
  <div>
    <div class="relative group flex flex-col space-y-4 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
      <!-- Make the circular image larger -->
      <div @click="$emit('editProfileImage')" class="flex items-center justify-center w-64 h-64 bg-gray-300 rounded-full dark:bg-gray-700 group-hover:bg-gray-400 cursor-pointer">
        <NuxtImg
          v-if="imageUrl"
          class="bg-white"
          width="256"
          height="150"
          :src="imageUrl"
          :preload="true"
        />
        <svg
          v-else
          class="w-36 h-36 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"></path>
        </svg>
        <!-- Display "Edit" text on hover with a circular background -->
        <div class="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 rounded-full bg-gray-700">
          Edit
        </div>
      </div>
    </div>
  </div>
</template>

  
<script lang="ts" setup>
import type { User } from "@/types";

  defineProps<{
    user: User | null;
  }>();

  defineEmits<{
      editProfileImage: [];
  }>();


</script>
  
