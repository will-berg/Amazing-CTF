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

let timer;

function checkForRedos(userData: RedosUserDetails): void {
  // Create a blob from the function and create a URL for the blob
  const blob = new Blob([`self.onmessage = function(e) {
    const workerData = e.data;
    const startTime = Date.now(); // Record the start time

    function checkMatchInWorker(userData){
      const username = userData.username;
      const password = userData.password;
      if (username.match(password)) {
        return "There is a match";
      } else {
        return "No match";
      }
    }

    const result = checkMatchInWorker(workerData);

    // Check if the worker execution took more than 5 seconds
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime >= 5000) {
      // Worker execution exceeded 5 seconds, terminate the worker
      self.postMessage('Worker execution exceeded 5 seconds');
      self.close(); // Close the worker
    } else {
      self.postMessage(result);
    }
  }`], { type: 'application/javascript' });

  const blobUrl = URL.createObjectURL(blob);
  const worker = new Worker(blobUrl);

  worker.addEventListener('message', handleWorkerMessage);

  // Start the timer
  timer = setTimeout(() => {
    // Timeout reached, terminate the worker
    worker.terminate();
    console.log('Worker terminated due to timeout');
     showSuccessCard.value = true;
  }, 5000); // 5 seconds

  // Serialize only the properties needed by the worker function
  const workerData = {
    username: userData.username,
    password: userData.password,
  };

  worker.postMessage(workerData);
}

function handleWorkerMessage(event: MessageEvent) {
  clearTimeout(timer); // Clear the timer
  const result = event.data;
  if (result === 'Worker execution exceeded 5 seconds') {
    console.log('Worker execution exceeded 5 seconds');
    // Handle the case when the worker takes too long
  } else {
    console.log(result); // Result from the worker
  }
}


function closeSuccessCard() {
  showSuccessCard.value = false;
}
</script>

<style></style>
