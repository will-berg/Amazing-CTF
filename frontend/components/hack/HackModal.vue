<template>
    <dialog v-if="openModal" id="my_modal_1" :class="{'modal' : true, 'modal-open': openModal}">
      <div v-if="hack" class="modal-box">
        <h3 class="font-bold text-lg">{{ hack.title }}</h3>
        <p class="py-4">{{ hack.description }}</p>
        <div class="modal-action">
          <NuxtLink :to="'/hackInfo/' + hack.id" class="btn btn-primary rounded-full">Select</NuxtLink>
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-primary rounded-full" @click="$emit('closeModal')">Close</button>
          </form>
        </div>
      </div>
    </dialog>
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
  