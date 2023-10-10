<template>
    <div>
      <div class="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
        <div class="flex flex-col space-y-4">
          <input type="file" @change="fileChanged"/>
          <button @click="$emit('uploadImage', selectedFile)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Upload
          </button>
        </div>
      </div>
    </div>
  </template>
  
<script lang="ts" setup>
import { ref } from 'vue';

const selectedFile = ref<File | null>(null);

const fileChanged = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files) {
    selectedFile.value = fileInput.files[0];
  }
};

defineEmits<{
      uploadImage: (selectedFile: File) => void;
}>();

</script>
