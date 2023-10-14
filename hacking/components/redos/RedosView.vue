<template>
    <div>
        <div class="flex flex-col items-center justify-center px-4">
            <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input v-model="userData.username" type="text" name="username" id="username" placeholder="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input v-model="userData.password" type="text" name=password id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <button @click="$emit('createAccount', userData)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Sign up!
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { RedosUserDetails } from '/@types'

const userData = reactive<RedosUserDetails>({
  username: '',
  password: '',
});

const emit = defineEmits<{
  createAccount: (userData: RedosUserDetails) => void;
}>();

</script>
<style></style>
