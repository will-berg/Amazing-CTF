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
            <tr v-for="entry in leaderboard" :key="entry.name" @click="navigateToUserProfile(entry.name)"
              class="cursor-pointer hover">
              <td class="border border-l-2 px-4 py-2">
                <div class="flex items-center justify-center">
                  <span v-if="entry.position <= 3">
                    <NuxtImg class="inline-block" width="24" height="24"
                      :src="`./images/medals/${entry.position}.webp`" />
                  </span>
                  <span v-else class="text-lg text-center">{{ entry.position }}</span>
                </div>
              </td>
              <td class="border px-4 py-2 truncate max-w-md hover:whitespace-normal hover:break-words">{{ entry.name
              }}
              </td>
              <td class="border px-4 py-2">{{ entry.points }}</td>
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

useHead({
    title: "Leaderboards",
});

function navigateToUserProfile(username: string) {
  return navigateTo(`/profile/${username}`);
}

const limit = 10; // Number of entries per page

const page = ref(1);
const { data, pending, error } = useFetch<Leaderboard>(
  "http://localhost:5000/leaderboard",
  { query: { page, limit } }
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