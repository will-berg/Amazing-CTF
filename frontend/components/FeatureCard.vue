<template>
    <div class="card bg-base-100 shadow-xl image-full">
        <div class="card-body">
            <h2 class="card-title">{{ title }}</h2>
            <p>{{ description }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    title: String,
    description: String,
});
</script>
