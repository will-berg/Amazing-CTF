<template>
  <div class="flex flex-col items-center h-screen relative">
    <!-- Navbar -->
    <div
      class="navbar bg-gray-900 text-white flex items-center justify-between p-4 space-x-4 absolute top-0 left-0 w-full">
      <div class="text-xl">
        ReDos Hack Page
      </div>
      <div>
        <button class="btn" @click="openLevelInfoModal">Level Info</button>
      </div>
    </div>

    <!-- RedosView -->
    <div class="flex flex-grow justify-center">
      <span v-if="pending" class="loading loading-spinner loading-lg"></span>
      <div v-if="!pending" class="flex items-center justify-center min-h-screen">
        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <div class="mb-6">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <BaseInput v-model:text="username" type="text" placeholder="Username" />
          </div>
          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <BaseInput v-model:text="password" type="text" placeholder="Password" />
          </div>
          <button @click="checkForRedos"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Sign up!
          </button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <dialog id="my_modal_3" :class="{ 'modal': true, 'modal-open': showModal }">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
        </form>
        <h3 class="font-bold text-lg">Regular Expression Denial of Service - ReDos</h3>
        <p class="text-sm">Medium Difficulty</p>
        <p class="py-4">The following is a create account form. You need to provide a username and password.</p>
        <p class="py-4">Some common functionality on create account forms is to ensure that the password does not contain
          the username (a safety measure)</p>
        <p class="py-4">Regex can come quite in handy when checking if that is the case. for example:</p>
        <p class="py-4 font-bold">username.match(password)</p>
        <p class="py-4">Your task, is to find two sets of input that causes a ReDos which will make the server load for a
          long time.</p>
        <p class="py-4">Happy Hacking!</p>
      </div>
    </dialog>


    <dialog id="my_modal_3" class="modal modal-open" v-if="completed">
      <div v-if="loading">
        <AlertLoading></AlertLoading>
      </div>
      <div v-if="error">
        <AlertError :errorMessage="error.toString"></AlertError>
      </div>
      <SuccessCard points="20" hackName="ReDos" />
    </dialog>

  </div>
</template>
  
<script lang="ts" setup>
const { loading, error, newPoints } = useHacking();

const completed = ref(false);
const pending = ref(false);
const showModal = ref<boolean>(true);

const username = ref<string>("");
const password = ref<string>("");
const openLevelInfoModal = () => {
  showModal.value = true;
}

const closeModal = () => {
  showModal.value = false;
}

let timer: NodeJS.Timeout | undefined;

function checkForRedos(): void {
  pending.value = true;

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

  // Start the timer 5 seconds
  timer = setTimeout(async () => {
    // Timeout reached, terminate the worker
    worker.terminate();
    pending.value = false;
    console.log('Worker terminated due to timeout');
    // Hack Completed! 
    await newPoints("ReDos")
    completed.value = true;
  }, 5000); 

  // properties needed by the worker function
  const workerData = {
    username: username.value,
    password: password.value,
  };

  worker.postMessage(workerData);
}

function handleWorkerMessage(event: MessageEvent) {
  pending.value = false;
  clearTimeout(timer); 
  const result = event.data;
  if (result === 'Worker execution exceeded 5 seconds') {
    console.log('Worker execution exceeded 5 seconds');
  } else {
    // Result from the worker
    console.log(result); 
  }
}

</script>
  
<style></style>
  