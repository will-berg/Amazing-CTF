<template>
  <div>
    <div class="container mx-auto p-4">
      <div v-if="error" class="pb-4">
        <AlertError :errorMessage="error?.message" />
      </div>
      <div v-else-if="pending" class="pb-4">
        <AlertLoading />
      </div>
      <div v-else-if="hacks" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <HackCard
        v-for="hack in hacks"
        :key="hack.id"
        :hack="hack"
        class="relative group overflow-hidden hover:scale-105 transform transition-transform duration-300"
        @selectedHack="openModal"
      />
    </div>
      <HackModal 
      :hack="selectedHack" 
      @close-modal="closeModal" 
      />
    </div>
  </div>
</template>



  
 <script lang="ts" setup>
 import { ref } from 'vue';
 import { HackDetails } from '~/types';

 const {data: hacks, error, pending} = await useFetch<HackDetails[]>('http://localhost:5000/api/challenges')
 const selectedHack = ref<HackDetails | null>(null);

const openModal = (hack: HackDetails) => {
  selectedHack.value = hack;
};

const closeModal = () => {
  selectedHack.value = null;
};

</script>
 
 <style></style>