<template>
  <div>
    <SuccessCard v-if="showSuccessCard" @closeSuccessCard="closeSuccessCard" />
    <RedosView @createAccount="checkForRedos" />
    <div v-if="processing" class="flex justify-center items-center h-screen">
      <!-- Add your spinner component or use a Tailwind CSS spinner here -->
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RedosUserDetails } from '@/types';

const showSuccessCard = ref(false);
const processing = ref(false); // Track processing state

function checkForRedos(userData: RedosUserDetails): void {
  const usernameRegex = new RegExp(userData.username, 'i'); 

  // Set processing to true when processing starts
  processing.value = true;

  const matchPromise = new Promise((resolve, reject) => {
    
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      reject(new Error('Took too much time'));
      showSuccessCard.value = true; 
    }, 5000);

    if (usernameRegex.test(userData.password)) {
      clearTimeout(timeout);
      resolve();
    }
  });

  matchPromise
    .then(() => {
      console.log('Username is contained within the password');
    })
    .catch((error) => {
      console.log(error.message);
    })
    .finally(() => {
      // Set processing to false when processing is complete
      processing.value = false;
    });
}

function closeSuccessCard() {
  showSuccessCard.value = false;
}
</script>

<style></style>
