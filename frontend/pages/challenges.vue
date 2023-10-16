<template>
  <div>
    <div class="container mx-auto p-4">
      <div v-if="hackError"><AlertError :errorMessage="hackError.message"></AlertError></div>
      <div v-else-if="hackPending"><AlertLoading></AlertLoading></div>
      <div v-else-if="hacks" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <HackCard
          v-for="hack in hacks"
          :isCompleted="checkCompleted(hack.title)"
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

//  const user: User = ref<User>({
//   email: "example@example.com",
//   username: "Regularclip",
//   completedHacks: ['ReDos', 'Hidden'],
//   points: 175, 
// });

const store = useUserStore()
const { user } = storeToRefs(store);

const {data: hacks, pending: hackPending, error: hackError} = await useFetch<HackDetails[]>(
    'http://localhost:5000/challenges'
)

const openModal = (hack: HackDetails): void => {
  selectedHack.value = hack;
  open.value = true;
};

const closeModal = (): void => {
  selectedHack.value = null;
  open.value = false;
};


const checkCompleted = (hackTitle: string): boolean => {
  if(user.completedHacks){
    return user.completedHacks.includes(hackTitle);
  } else {
    return false;
  }
};

</script>
 
 <style></style>