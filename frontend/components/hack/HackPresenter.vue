<template>
    <div>
      <!-- Include the HackingView component and pass 'hacks' as a prop -->
      <HackListView :hacks="hacks" />
    </div>
</template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';

    // Declare the 'hacks' data property
    const hacks = ref([
    {
        id: 1,
        title: 'ReDos',
        description: 'Regular Expression Denial of Service (ReDos)...',
        imageUrl: '/images/injection.png',
    },
    {
        id: 2,
        title: 'SQLInjection',
        description: 'Regular Expression Denial of Service (ReDos)...',
        imageUrl: '/images/injection.png',
    },
    {
        id: 3,
        title: 'Deserialization',
        description: 'Regular Expression Denial of Service (ReDos)...',
        imageUrl: '/images/injection.png',
    },
    {
        id: 4,
        title: 'XSS',
        description: 'Regular Expression Denial of Service (ReDos)...',
        imageUrl: '/images/injection.png',
    },
    ]);
    </script>

  <style></style>
  