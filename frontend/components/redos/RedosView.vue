<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <!-- Your form content -->
      <div class="mb-6">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
        <BaseInput v-model:text="username" type="text" placeholder="username" />
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <BaseInput v-model:text="password" type="text" placeholder="password" />
      </div>
      <button @click="$emit('createAccount', username, password)"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Sign up!
      </button>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
defineProps<{
  username: string,
  password: string,
}>();

defineEmits<{
  (event: "createAccount", username: string, password: string): void;
}>();

</script>
<style></style>
