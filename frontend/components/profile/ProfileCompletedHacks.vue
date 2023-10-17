<template>
  <div v-if="hacks" class="card w-80 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title" v-if="hacks.length === 0">You have not completed any hacks :(</h2>
      <h2 class="card-title" v-if="hacks.length > 0">Completed Hacks!</h2>
      <ul v-if="hacks">
        <li v-for="hack in hacks" :key="hack">
          <div class="flex items-center justify-between">
            {{ hack }}
            <span class="badge badge-success">✓</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
defineProps<{
  hacks: string[] | null;
}>();
</script>
  
<style scoped></style>