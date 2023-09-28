<!-- Leaderboard page -->
<template>
  <div class="flex flex-col items-center m-auto">
    <div v-if="error" class="pb-4">
      <AlertError :errorMessage="error?.message" />
    </div>
    <div v-else-if="pending" class="pb-4">
      <AlertLoading />
    </div>
    <!-- Center everything in the middle of the page -->
    <div v-else class="flex flex-col items-center m-auto">
      <h1 class="text-4xl pb-4 text-yellow-500 font-bold">Leaderboard</h1>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <!-- Table -->
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <!-- Table header -->
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                  </tr>
                </thead>
                <!-- Table body -->
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="entry in leaderboard" :key="entry.username"
                    class="hover:bg-gray-100 cursor-pointer hover:shadow-md"
                    @click="navigateToUserProfile(entry.username)">
                    <!-- Top 3 renders a medal icon with the rank inside -->
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-lg text-gray-900 flex items-center justify-center">
                        <span v-if="entry.position <= 3">
                          <NuxtImg class="inline-block" width="24" height="24"
                            :src="`./images/medals/${entry.position}.webp`" />
                        </span>
                        <span v-else>{{ entry.position }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ entry.username }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ entry.score }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- Pagination -->
              <div class="px-6 py-3">
                <Pagination :page="page" :maxPage="maxPage" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserLeaderboard } from '~/types';

function navigateToUserProfile(username: string) {
  return navigateTo(`/profile/${username}`);
}

// Load the leaderboard data from the API endpoint (temporarily use dummy data)
const error: any = ref(null);
const pending = ref(false);
const page = ref(1);
const maxPage = ref(10);
const leaderboard: Ref<UserLeaderboard[]> = ref([
  {
    position: 1,
    username: 'user1',
    score: 100,
  },
  {
    position: 2,
    username: 'user2',
    score: 90,
  },
  {
    position: 3,
    username: 'user3',
    score: 60,
  },
  {
    position: 4,
    username: 'user4',
    score: 10,
  },
]);

</script>