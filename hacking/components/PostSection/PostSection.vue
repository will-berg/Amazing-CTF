<template>
    <div
        class="bg-gray-800 border-double border-4 border-green-600 rounded-md flex flex-col gap-4 justify-center w-96 items-center text-center p-6">
        <div class="text-white ">
            {{ title }}
        </div>
        <div v-html="postData" class="text-black">
        </div>
        <div class="text-white">
            {{ author }}
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        required: false
    },
    postData: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
})
console.log("postsection data:" + props.postData)
</script>