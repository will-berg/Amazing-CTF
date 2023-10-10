<template>
    <div>
      <h2>Post and Render HTML</h2>
      <input type="text" v-model="userInput" placeholder="Enter HTML here">
      <button @click="postHtml">Post</button>
      <p>Using text interpolation: {{ userInput }}</p>
      
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        userInput: '',
      };
    },
    methods: {
      postHtml() {
        console.log('Rendered HTML:', this.userInput);
      },
    },
  };
  </script>
  