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
    <div v-else class="w-full flex flex-col items-center justify-center">
      <h1 class="text-3xl font-bold mb-4 text-yellow-400">Leaderboard</h1>
      <div class="overflow-x-auto max-w-full">
        <table class="table w-fit rounded-xl shadow-lg">
          <thead class="uppercase text-sm leading-normal text-white bg-gray-800">
            <tr>
              <th class="px-4 py-2">Rank</th>
              <th class="px-4 py-2">Username </th>
              <th class="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="entry in leaderboard" :key="entry.username" @click="navigateToUserProfile(entry.username)"
              class="cursor-pointer hover"> -->
            <!-- Removed link to user profile because it's not capable of handling other users than the logged in user -->
            <tr v-for="entry in leaderboard" :key="entry.username">
              <td class="border border-l-2 px-4 py-2" :class="{ 'border-you': entry.username === user?.username }">
                <div class="flex items-center justify-center">
                  <span v-if="entry.position <= 3">
                    <NuxtImg class="inline-block" width="24" height="24"
                      :src="`./images/medals/${entry.position}.webp`" />
                  </span>
                  <span v-else class="text-lg text-center">{{ entry.position }}</span>
                </div>
              </td>
              <td class="border px-4 py-2 truncate max-w-md hover:whitespace-normal hover:break-words"
                :class="{ 'border-you': entry.username === user?.username }">{{ entry.username
                }}
              </td>
              <td class="border px-4 py-2" :class="{ 'border-you': entry.username === user?.username }">{{
                entry.points }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex items-center justify-center mt-4">
        <Pagination :page="page" :max_page="max_page" @update:page="newPage => page = newPage" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Leaderboard } from "@/types";
import { storeToRefs } from "pinia";

const store = useUserStore();
const { user } = storeToRefs(store);

useHead({
  title: "Leaderboards",
});

// function navigateToUserProfile(username: string) {
//   return navigateTo(`/profile/${username}`);
// }

const limit = 10; // Number of entries per page
const page = ref(1);

// Couldn't get the server side rendering to work with the fetching of the leaderboard data
// It refuses to connect to the backend server with the following error:
// "[GET] "http://127.0.0.1:5000/leaderboard?page=1&limit=10": <no response> request to http://127.0.0.1:5000/leaderboard?page=1&limit=10 failed, reason: connect ECONNREFUSED 127.0.0.1:5000"
//
// FetchError: [GET] "http://127.0.0.1:5000/leaderboard?page=1&limit=10": <no response> request to http://127.0.0.1:5000/leaderboard?page=1&limit=10 failed, reason: connect ECONNREFUSED 127.0.0.1:5000
//   at processTicksAndRejections (node:internal/process/task_queues:96:5)
//     at async $fetchRaw2 (file:///app/frontend/.output/server/chunks/nitro/node-server.mjs:2753:14)
//     at async $fetch2 (file:///app/frontend/.output/server/chunks/nitro/node-server.mjs:2786:15)
//     at async setup (file:///app/frontend/.output/server/chunks/app/_nuxt/leaderboard-3c68de4a.mjs:171:18) {
//   cause: FetchError: request to http://127.0.0.1:5000/leaderboard?page=1&limit=10 failed, reason: connect ECONNREFUSED 127.0.0.1:5000
//       at ClientRequest.<anonymous> (file:///app/frontend/.output/server/chunks/nitro/node-server.mjs:50:18233)
//       at ClientRequest.emit (node:events:513:28)
//       at Socket.socketErrorListener (node:_http_client:494:9)
//       at Socket.emit (node:events:513:28)
//       at emitErrorNT (node:internal/streams/destroy:157:8)
//       at emitErrorCloseNT (node:internal/streams/destroy:122:3)
//       at processTicksAndRejections (node:internal/process/task_queues:83:21) {
//     type: 'system',
//     errno: 'ECONNREFUSED',
//     code: 'ECONNREFUSED',
//     erroredSysCall: 'connect'
//   },
//   statusCode: 500,
//   fatal: false,
//   unhandled: false,
//   statusMessage: undefined,
//   data: undefined,
//   __nuxt_error: true
// }
//
// However, running the frontend server with "npm run dev" works fine and the leaderboard is fetched correctly even in server side rendering.
// The only solution I found was to use the useFetch hook with server: false and lazy: true.
const { data, pending, error } = await useFetch<Leaderboard>(
  "http://127.0.0.1:5000/leaderboard",
  { query: { page, limit }, method: "GET", lazy: true, server: false }
);

// map the position of the user in the leaderboard
const leaderboard = computed(() => {
  if (!data.value?.leaderboard) return [];

  const initialPosition = (page.value - 1) * limit;
  return data.value.leaderboard.map((entry, index) => ({
    ...entry,
    position: index + initialPosition + 1,
  }));
});

// calculate the max page based on the total number of entries
const max_page = computed(() => {
  if (!data.value?.total) return 1;
  const max_page = Math.ceil(data.value.total / limit);
  // Make sure the page is never higher than the max page
  page.value = Math.min(page.value, max_page);
  return max_page;
});
</script>

<style scoped>
.border-you {
  border-color: #facf15;
  border-width: 2px;
}
</style>