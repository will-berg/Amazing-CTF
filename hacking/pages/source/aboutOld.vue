<template>
    <div>
      <SuccessCard v-if="showSuccessCard"/>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const showSuccessCard = ref(true);

  </script>
  
  <style></style>
  