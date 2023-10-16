<template>
    <dialog id="my_modal_3" class="modal modal-open" v-if="completed">
        <SuccessCard points="10" hackName="Hidden" />
    </dialog>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const completed = ref(true);

  </script>
  
  <style></style>