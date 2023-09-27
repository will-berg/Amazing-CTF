<template>
    <div>Profile page for user: {{ username }}</div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
const username = route.params.username as string;
</script>
