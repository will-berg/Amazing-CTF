<template>
  <div class="flex justify-center items-center h-screen">
    <div class="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-5 justify-center items-center mx-5">
      <!-- Your card content goes here -->
      <label class="swap swap-active text-6xl">
        <div class="swap-on">🥳</div>
      </label>
      <h2 class="text-xl font-semibold">Success!</h2>
      <p class="text-gray-700 text-center">You have succesfully finished the {{ hackName }} hack and have been awarded
        {{ points }}
        points if this is your first time completing this task!</p>
      <button class="btn btn-primary" @click="navigateTo('/')">Return</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import party from "party-js";

defineProps({
  points: {
    type: String,
    required: true
  },
  hackName: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: false,
    default: "Success!"
  }
})

onMounted(() => {
  const element = document.querySelector(".h-screen") as HTMLElement | null
  if (!element) return
  party.confetti(element, {
    count: party.variation.range(50, 200),
  })
})

</script>