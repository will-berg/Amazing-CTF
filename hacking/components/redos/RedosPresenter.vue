<template>
    <div>
      <!-- Include the HackingView component and pass 'hacks' as a prop -->
      <RedosView
      @createAccount="checkForRedos"
      />
    </div>
</template>
<script lang="ts" setup>
import { RedosUserDetails } from '@/types';

function checkForRedos(userData: RedosUserDetails): void {
  const usernameRegex = new RegExp(userData.username, 'i'); // 'i' flag for case-insensitive match

  const matchPromise = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      reject(new Error('Took too much time'));
    }, 5000);

    if (usernameRegex.test(userData.password)) {
      clearTimeout(timeout); 
      resolve();
    }
  });

  matchPromise
    .then(() => {
      console.log('Username is contained within the password');
    })
    .catch((error) => {
      console.log(error.message); 
    });
}

</script>
<style></style>
