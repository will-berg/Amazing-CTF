<template>
  <div>
    <div v-if="hacks" class="container mx-auto p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <HackCard
          v-for="hack in hacks"
          :key="hack.id"
          :hack="hack"
          class="relative group overflow-hidden hover:scale-105 transform transition-transform duration-300"
        />
      </div>
    </div>
  </div>
</template>

  
  <script lang="ts" setup>
  import type { HackDetails } from "@/types";
  import HackCard from "@/components/hack/HackCard.vue";

    const props = defineProps<{
      hacks: HackDetails| null;
    }>();

    const emit = defineEmits<{
      selectHack: [];
    }>();

  </script>