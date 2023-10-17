<template>
    <NuxtLink v-if="link" :to="link">
        <div class="group card bg-gray-800 shadow-xl image-full hover:bg-black">
            <div class="card-body">
                <h2 class="card-title group-hover:text-white">
                    <Icon :name="icon" />{{ title }}
                </h2>
                <p class="group-hover:text-white">{{ description }}</p>
            </div>
        </div>
    </NuxtLink>
    <div v-else class="card bg-gray-800 shadow-xl image-full">
        <div class="card-body">
            <h2 class="card-title">
                <Icon :name="icon" />{{ title }}
            </h2>
            <p>{{ description }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    title: string,
    description: string,
    icon: string,
    link: string,
}>();
</script>
