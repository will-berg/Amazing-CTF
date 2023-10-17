<template>
    <dialog id="my_modal_3" class="modal modal-open" v-if="completed">
        <div v-if="loading">
            <AlertLoading></AlertLoading>
        </div>
        <div v-if="error">
            <AlertError :errorMessage="error.toString"></AlertError>
        </div>
        <SuccessCard points="10" hackName="Hidden" />
    </dialog>
</template>
  
<script lang="ts" setup>
const { loading, error, newPoints } = useHacking();

await newPoints("Hidden");

const completed = ref(true);

</script>
  
<style></style>