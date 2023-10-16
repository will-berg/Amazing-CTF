<template>
  <div class="h-screen flex flex-col items-center relative">
    <!-- Navbar -->
    <div class="navbar bg-gray-900 text-white flex items-center justify-between p-4 space-x-4 absolute top-0 left-0 w-full">
      <div class="text-xl">
        Hidden Hack Page
      </div>
      <div>
        <button class="btn" @click="openLevelInfoModal">Level Info</button>
      </div>
    </div>

    <!-- Centered Content -->
    <div class="flex flex-grow items-center justify-center">
      <!-- Dont forget to delete the old about page /aboutOld-->
      <p class="text-2xl">Nothing to see here!</p>
    </div>

    <!-- Modal -->
    <dialog id="my_modal_3" :class="{'modal' : true, 'modal-open': showModal}">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
        </form>
        <h3 class="font-bold text-lg">Hidden</h3>
        <p class="text-sm">Easy Difficulty</p>
        <p class="py-4">Don't judge a book by its cover!</p>
        <p class="py-4">Happy Hacking!</p>
      </div>
    </dialog>
  </div>
</template>



<script lang="ts" setup>
const showModal = ref<boolean>(true);

const openLevelInfoModal = () => {
  showModal.value = true;
}

const closeModal = () => {
  showModal.value = false;
}
</script>
