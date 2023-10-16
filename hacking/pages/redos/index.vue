<template>
  <div class="flex flex-col items-center h-screen relative">
    <!-- Navbar -->
    <div class="navbar bg-gray-900 text-white flex items-center justify-between p-4 space-x-4 absolute top-0 left-0 w-full">
      <div class="text-xl">
        ReDos Hack Page
      </div>
      <div>
        <button class="btn" @click="openLevelInfoModal">Level Info</button>
      </div>
    </div>

    <!-- RedosView -->
    <div class="flex flex-grow justify-center">
      <RedosView v-if="!completed" @createAccount="checkForRedos" />
    </div>

    <!-- Modals -->
    <dialog id="my_modal_3" :class="{'modal' : true, 'modal-open': showModal}">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
          </form>
          <h3 class="font-bold text-lg">Regular Expression Denial of Service - ReDos</h3>
          <p class="text-sm">Medium Difficulty</p>
          <p class="py-4">The following is a create account form. You need to provide a username and password.</p>
          <p class="py-4">Some common functionality on create account forms is to ensure that the password does not contain the username (a safety measure)</p>
          <p class="py-4">Regex can come quite in handy when checking if that is the case. for example:</p>
          <p class="py-4 font-bold">username.match(password)</p>
          <p class="py-4">Your task, is to find two sets of input that causes a ReDos.</p>
          <p class="py-4">Happy Hacking!</p>
      </div>
    </dialog>


    <dialog id="my_modal_3" class="modal modal-open" v-if="completed">
      <SuccessCard points="20" hackName="ReDos" />
    </dialog>

    <!-- Loading Spinner -->
    <span v-if="pending" class="loading loading-spinner loading-lg"></span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RedosUserDetails } from '@/types';

const completed = ref(false);
const pending = ref(false);
const showModal = ref<boolean>(true);


const openLevelInfoModal = () => {
  showModal.value = true;
}

const closeModal = () => {
  showModal.value = false;
}

let timer;

function checkForRedos(userData: RedosUserDetails): void {
  pending.value = true;
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
    pending.value = false;
    console.log('Worker terminated due to timeout');
     completed.value = true;
  }, 5000); // 5 seconds

  // Serialize only the properties needed by the worker function
  const workerData = {
    username: userData.username,
    password: userData.password,
  };

  worker.postMessage(workerData);
}

function handleWorkerMessage(event: MessageEvent) {
  pending.value = false;
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
  completed.value = false
}
</script>

<style></style>
