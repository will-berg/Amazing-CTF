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
        name: "redos",
        title: 'ReDos',
        description: 'Regular Expression Denial of Service (ReDos)...Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        imageUrl: '/images/injection.png',
    },
    {
        id: 2,
        name: "SQLInjection",
        title: 'SQLInjection',
        description: 'Regular Expression Denial of Service (ReDos)...Lorem Ipsum is simply dummy text o standard dummy text ever since the 1500s, when an unknown printer',
        imageUrl: '/images/injection.png',
    },
    {
        id: 3,
        name: "Deserialization",
        title: 'Deserialization',
        description: 'Regular Expression Denial of Service (ReDos)...Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printert to make a type specimen book.',
        imageUrl: '/images/injection.png',
    },
    {
        id: 4,
        name: 'XSS',
        title: 'XSS',
        description: 'Regular Expression Denial of Service (ReDos)...',
        imageUrl: '/images/injection.png',
    },
    {
        id: 5,
        name: 'PrototypePollution',
        title: 'Prototype Pollution',
        description: 'Regular Expression Denial of Service (ReDos)...Lorem Ipsum is simply dummy text of the printi',
        imageUrl: '/images/injection.png',
    },
    {
        id: 5,
        name: 'Something',
        title: 'Something',
        description: 'Regular Expression Denial of Service (ReDos)...Lorem Ipsum is simply dummy text of the printi',
        imageUrl: '/images/injection.png',
    },
    ]);
    </script>

  <style></style>
  