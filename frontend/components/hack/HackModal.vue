<template>
  <div v-if="openModal">
    <div v-if="hack">
      <dialog :open="isOpen" class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">{{ hack.title }}</h3>
          <p class="py-4">{{ hack.description }}</p>
          <div class="modal-action">
            <button class="btn btn-primary rounded-full" @click="$emit('selectHack', hack)">Select</button>
            <button class="btn btn-primary rounded-full" @click="$emit('closeModal')">Close</button>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import type { HackDetails } from '@/types';

  const isOpen = ref(false);
  
  const props = defineProps<{
    hack: HackDetails | null;
    openModal: boolean;
  }>();

  defineEmits<{
    selectHack: (hack: HackDetails) => void;
    closeModal: [];
  }>();
  
  
  // Watch for changes in the `hack` prop and open the modal when a new hack is selected
  watchEffect(() => {
    if (props.openModal) {
      isOpen.value = true;
    } else {
      isOpen.value = false;
    }
  });
  </script>
  