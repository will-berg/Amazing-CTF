<template>
  <h1 class="text-2xl p-4 justify-center">
    {{ data?.fact }}
  </h1>
  <button class="btn btn-primary" @click="refresh()">
    Get another cat fact
  </button>
</template>

<script lang="ts" setup>
import { CatFact } from "@/types";

const { data, refresh } = await useFetch<CatFact>(
  "https://catfact.ninja/fact"
);
</script>
