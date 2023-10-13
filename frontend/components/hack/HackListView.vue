<template>
    <div>
      <!-- Cards -->
      <div v-if="hacks" class="container mx-auto p-4">
        <div class="flex flex-wrap">
          <!-- Iterate over hacks and create cards -->
          <div
            v-for="hack in hacks"
            :key="hack.id"
            class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 relative group"
          >
            <div class="rounded-lg shadow-md p-4 h-full overflow-hidden transform transition-transform duration-300 group-hover:-translate-y-2">
              <!-- Hacking Image -->
              <NuxtImg class="bg-white"
                width="256"
                height="150"
                :src="hack.imageUrl"
                :preload="true"
              />
              <!-- Title, Description and Link -->
              <h2 class="text-xl font-semibold">{{ hack.title }}</h2>
              <p class="h-24 overflow-y-hidden">{{ hack.description }}</p>
              <a href="#" class="flex items-center justify-center mt-2 btn btn-primary w-full">Start</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script lang="ts" setup>
  import type { HackDetails } from "@/types";

    const props = defineProps<{
      hacks: HackDetails| null;
    }>();

    const emit = defineEmits<{
      selectHack: [];
    }>();

  </script>