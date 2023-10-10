<template>
    <div v-if="hack">
      <dialog :open="isOpen" class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">{{ hack.title }}</h3>
          <p class="py-4">{{ hack.description }}</p>
          <div class="modal-action">
            <button class="btn" @click="selectHack">Select</button>
            <button class="btn" @click="closeModal">Close</button>
          </div>
        </div>
      </dialog>
    </div>
</template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import type { HackDetails } from '@/types';
  
  const props = defineProps<{
    hack: HackDetails | null;
  }>();
  
  const { emit } = defineEmits();
  
  const isOpen = ref(false);
  
  const selectHack = () => {
    // Emit an event to inform the parent component that the hack is selected
    emit('select-hack', props.hack);
  };
  
  const closeModal = () => {
    isOpen.value = false;
    // Emit an event to inform the parent component that the modal is closed
    emit('close-modal');
  };
  
  // Watch for changes in the `hack` prop and open the modal when a new hack is selected
  watchEffect(() => {
    if (props.hack) {
      isOpen.value = true;
    }
  });
  </script>
  