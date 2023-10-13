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
                  <tr v-for="entry in leaderboard" :key="entry.name"
                    class="hover:bg-gray-100 cursor-pointer hover:shadow-md" @click="navigateToUserProfile(entry.name)">
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
                      <div class="text-sm text-gray-900">{{ entry.name }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ entry.points }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- Pagination -->
              <div class="px-6 py-3">
                <Pagination :page="page" :max_page="max_page" @update:page="page = $event" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Leaderboard } from "@/types";

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
