<template>
    <div class="bg-gray-800 border-double border-4 border-green-600 rounded-md flex flex-col gap-4 justify-center w-96 items-center text-center p-6">
        <div class="text-white ">
            {{ title }}
        </div>
        <div class="text-white">
            {{ description }}
        </div>
    </div>
</template>

<script lang="ts" setup>
    defineProps({
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        }
    })
</script>