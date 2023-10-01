<template>
    <div class="relative min-h-screen">
      <div class="prose max-w-none mt-4">
        <ContentRenderer :value="data" />
      </div>
      <div class="fixed bottom-0 left-0 right-0 p-4 flex justify-center">
        <button class="btn btn-info hover:bg-blue-600 transition-bg ease-in-out duration-200" @click="redirectToName">Start</button>
      </div>
    </div>
  </template>
  
 <script lang="ts" setup>
    const {name} = useRoute().params
    const { data } = await useAsyncData(name, () => queryContent(`/${name}`).findOne());

    const redirectToName = () => {
        const url = `http://localhost:4000/${name}`; // Construct the URL
        window.location.href = url;
    };
 </script>

 <style></style>