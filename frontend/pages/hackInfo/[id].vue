<template>
  <div>
    <div v-if="error"><AlertError :errorMessage="error.message"></AlertError></div>
    <div v-else-if="pending"><AlertLoading></AlertLoading></div>
    <div v-else-if="hack" class="flex flex-col items-center justify-center space-y-4">
      <h1>{{ hack.title }}</h1>
      <div class="max-w-md mx-auto"> <!-- Add a container with maximum width and center the content -->
        <div v-html="formattedInformationPage"></div>
      </div>
      <button class="btn btn-primary rounded-full" @click="navTo(hack.name)">Start</button>
    </div>
  </div>
</template>
  
 <script lang="ts" setup>
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";
  import { HackDetails } from "~/types";

  const { id } = useRoute().params;
  
  // Show appropriate error message
  const {data: hack, pending, error } = await useFetch<HackDetails>(
    `http://localhost:5000/challenges/${id}`
  )

  const formattedInformationPage = computed(() => {
  const paragraphs = hack.value.informationPage.split('\n').filter(para => para.trim() !== '');
  const formattedParagraphs = paragraphs.map(para => `<p>${para}</p>`);

  return formattedParagraphs.join('');
  });

const navTo = (name: string) => {
  console.log("here is the name: " , name)
  const url = `http://localhost:4000/${name}`
  return navigateTo(url, { external: true })
}

 </script>

 <style></style>