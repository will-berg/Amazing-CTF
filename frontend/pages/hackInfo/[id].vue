<template>
    <div>
      <div v-if="error"><AlertError :errorMessage="error.message"></AlertError></div>
      <div v-else-if="pending"><AlertLoading></AlertLoading></div>
      <div v-else-if="hack">
        <h1>{{ hack.title }}</h1>
        <span>{{ hack.informationPage }}</span>
      </div>
  </div>
  </template>
  
 <script lang="ts" setup>
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";
  import { HackDetails } from "~/types";

  // const hackStore = useHackStore();

  const { id } = useRoute().params;
  // const hackId = parseInt(id, 10)
  // const hack = hackStore.getHackById(hackId);
  // console.log("Here is the hack: " , hack)
  
  // Show appropriate error message
  const {data: hack, pending, error } = await useFetch<HackDetails>(
    `http://localhost:5000/challenges/${id}`
  )

 </script>

 <style></style>