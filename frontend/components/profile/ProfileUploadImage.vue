<template>
  <dialog v-if="openModal" id="my_modal_1" :class="{ 'modal': true, 'modal-open': openModal }">
    <div class="modal-box">
      <div class="modal-action">
        <input type="file" class="file-input w-full max-w-xs" @change="fileChanged" />
        <button class="btn btn-primary rounded-full" @click="$emit('uploadImage', selectedFile)">Upload</button>
        <form method="dialog">
          <button class="btn btn-primary rounded-full" @click="$emit('closeModal')">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';

const selectedFile = ref<File | null>(null);
const isOpen = ref<boolean>(false);

const fileChanged = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files) {
    selectedFile.value = fileInput.files[0];
  }
};

const props = defineProps<{
  openModal: boolean
}>();

defineEmits<{
  (event: "uploadImage", selectedFile: File): void;
  (event: "closeModal"): void;
}>();


watchEffect(() => {
  if (props.openModal) {
    isOpen.value = true;
  } else {
    isOpen.value = false;
  }
});


</script>
  