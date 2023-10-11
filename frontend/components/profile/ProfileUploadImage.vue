<template>
    <div v-if="openModal">
        <dialog :open="isOpen" class="modal">
            <div class="modal-box">
                <input class="input" type="file" @change="fileChanged"/>
                <div class="modal-action">
                <button class="btn btn-primary rounded-full" @click="$emit('uploadImage', selectedFile)">Upload</button>
                </div>
            </div>
        </dialog>
    </div>
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
      uploadImage: (selectedFile: File) => void;
}>();


watchEffect(() => {
    if (props.openModal) {
      isOpen.value = true;
      selectedFile.value = null
    } else {
        isOpen.value = false;
    }
  });


</script>
  