<template>
    <button class="btn" onclick="my_modal_3.showModal()">{{ buttonText }}</button>
    <dialog id="my_modal_3" class="modal">
        <div class="modal-box">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
            </form>
            <h3 class="font-bold text-lg">{{ title }}</h3>
            <p class="py-4 text-black">Press ESC key or click on ✕ button to close</p>
        </div>
    </dialog>
</template>

<script lang="ts" setup>
defineProps({
    buttonText: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})
</script>