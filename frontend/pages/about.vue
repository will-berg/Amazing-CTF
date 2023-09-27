<!-- About us page -->
<template>
    <div>
        <ContentRenderer :value="data" class="prose max-w-none" />
    </div>
</template>

<script lang="ts" setup>
const { data } = await useAsyncData("about", () => queryContent("/about").findOne());
</script>
