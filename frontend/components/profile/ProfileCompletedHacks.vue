<template>
    <div>
      <div v-if="hacks" class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Completed Hacks</h2>
          <ul>
            <li v-for="hack in hacks" :key="hack">
              <div class="completed-hack">
                {{ hack }}
                <span class="badge badge-success">✓</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps } from 'vue';
  
  const props = defineProps<{
    hacks: string[] | null;
  }>();
  </script>
  
<style scoped>
.completed-hack {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>