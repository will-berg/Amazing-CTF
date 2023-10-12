<template>
  <div>
    <div class="container mx-auto p-4">
      <div :key="rerender" v-if="hacks" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <HackCard
        v-for="hack in hacks"
        :key="hack.id"
        :hack="hack"
        class="relative group overflow-hidden hover:scale-105 transform transition-transform duration-300"
        @selectedHack="openModal"
      />
    </div>
      <HackModal 
      :openModal="open"
      :hack="selectedHack" 
      @close-modal="closeModal" 
      />
    </div>
  </div>
</template>



  
 <script lang="ts" setup>
 import { ref, onMounted, watch } from 'vue';
 import { HackDetails } from '~/types';
 import { storeToRefs } from "pinia";

 const selectedHack = ref<HackDetails | null>(null);
 const open = ref<boolean>(false);
 const rerender = ref<number>(0);


 const hackStore = useHackStore();
 const  { hacks } = storeToRefs(hackStore);


 if(!hacks.value){
    console.log("Fetching")
    const {data: fetchedHacks, pending, error} = await useFetch(
      'http://localhost:5000/challenges'
    )

    if(fetchedHacks){
      console.log("Here are the fetched hacks: ", fetchedHacks)
      hackStore.setHacks(fetchedHacks)
      hacks.value = fetchedHacks // so that the hacks render on initial load
    }
  }
 

const openModal = (hack: HackDetails): void => {
  selectedHack.value = hack;
  open.value = true;
};

const closeModal = (): void => {
  selectedHack.value = null;
  open.value = false;
};


</script>
 
 <style></style>