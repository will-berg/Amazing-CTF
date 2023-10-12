<template>
    <div v-if="hack">
      <h1>{{ hack.title }}</h1>
      <span>{{ hack.informationPage }}</span>
    </div>
  </template>
  
 <script lang="ts" setup>
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";
  import { HackDetails } from "~/types";

  const hackStore = useHackStore();

  const { id } = useRoute().params;
  const hackId = parseInt(id, 10)
  const hack = hackStore.getHackById(hackId);
  console.log("Here is the hack: " , hack)
    

 </script>

 <style></style>