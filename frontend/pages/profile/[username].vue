<template>
    <div>Profile page for user: {{ username }}</div>
</template>

<!--Maybe use something like this to display some cool stats: https://daisyui.com/components/stat/-->
<script lang="ts" setup>
useHead({
    title: "Profile",
});

import { useRoute } from "vue-router";

const route = useRoute();
const username = route.params.username as string;
</script>
