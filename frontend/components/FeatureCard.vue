<template>
    <NuxtLink :to="link">
    <div class="group card bg-gray-800 shadow-xl image-full hover:bg-black">
        <div class="card-body">
            <h2 class="card-title group-hover:text-white"><Icon :name="icon" />{{ title }}</h2>
            <p class="group-hover:text-white">{{ description }}</p>
        </div>
    </div>
    </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
    title: String,
    description: String,
    icon: String,
    link: String,
});
</script>
