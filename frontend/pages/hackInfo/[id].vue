<template>
  <div>
    <div v-if="hackError"><AlertError :errorMessage="hackError.message"></AlertError></div>
    <div v-else-if="pendingHack"><AlertLoading></AlertLoading></div>
    <div v-else-if="hack" class="flex flex-col items-center justify-center space-y-4">
      <h1>{{ hack.title }}</h1>
      <div class="max-w-md mx-auto"> <!-- Add a container with maximum width and center the content -->
        <div v-html="hack.informationPage"></div>
      </div>
      <button class="btn btn-primary rounded-full" @click="navTo(hack.name)">Start</button>
    </div>
  </div>
</template>
  
 <script lang="ts" setup>
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";
  import { HackDetails } from "~/types";

  definePageMeta({
    middleware: ["authenticate"]
  })
  const { id } = useRoute().params;
  
  // Show appropriate error message
  const {data: hack, pending: pendingHack, error: hackError } = await useFetch<HackDetails>(
    `http://localhost:5000/challenges/${id}`,{
      method: "GET",
      server: false 
    }
  )

const navTo = (name: string) => {
  console.log("here is the name: " , name)
  const url = `http://localhost:4000/${name}`
  return navigateTo(url, { external: true })
}

 </script>
