<template>
  <div v-if="error" class="pb-4">
    <AlertError :errorMessage="error?.message" />
  </div>
  <div v-if="pending" class="pb-4">
    <AlertLoading />
  </div>

  <h1 v-if="!error && !pending" class="text-2xl pb-4 justify-center">
    {{ data?.fact }}
  </h1>
  <h2 class="text-xl pb-4 justify-center">
    {{ data?.length ?? 0 }} / {{ max_length }} characters
  </h2>
  <div class="pb-4">
    <input type="range" min="0" max="1000" v-model="max_length" />
  </div>

  <button class="btn btn-primary" @click="refresh()">
    Get another cat fact
  </button>
</template>

<script lang="ts" setup>
import { CatFact } from "@/types";

const max_length = ref(100);

const { data, pending, error, refresh } = await useFetch<CatFact>(
  "https://catfact.ninja/fact", {
  query: { max_length },
});
</script>
