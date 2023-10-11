<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div>
      <div class="flex flex-col items-center text-center">
        <ProfileImg 
        :image="image" 
        @openUploadProfileImage="openUploadProfileImage"
        />
        <hr class="w-96 h-1 mx-auto my-4 bg-green-100 border-0 rounded md:my-10 dark:bg-gray-700">
        <h2>{{ user.username }}</h2>
        <h4>Total Score: {{ user.points }}</h4>
        <hr class="w-96 h-1 mx-auto my-4 bg-green-100 border-0 rounded md:my-10 dark:bg-gray-700">
        <CompletedHacks :hacks="user.completedHacks" />
        <UploadProfileImage 
        class="modal-overlay"
        :openModal="open"
        @uploadImage="uploadProfileImage"
        />
      </div>
    </div>
  </div>
</template>
  

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { User } from "@/types"
import { ref } from 'vue';

const store = useUserStore()
const image = ref<string>("");
const open = ref<boolean>(false);


const user: User = ref<User>({
  email: "example@example.com",
  username: "Regularclip",
  completedHacks: ['SQLInject', 'ReDos', 'XSS-easy', 'XSS-hard'],
  points: 175, 
});


const { pending } = useAsyncData('profileImage', async () => {
  const queryParams = new URLSearchParams({ username: user.value.username });
  const url = `http://localhost:5000/profile?${queryParams.toString()}`;
  image.value = url;
});

const openUploadProfileImage = ():void => {
  console.log("click was registered")
  open.value = true
}

const uploadProfileImage = async (image: File | null):Promise<void> => {
  open.value = false
  console.log("Image", image)
  if (!image) {
    console.error("No image selected");
    return;
  }
  const formData = new FormData();
  formData.append('username', user.value.username);
  formData.append('image', image, `${user.value.username}_profile_image.png`);

  const { data: responseData, error, pending } = await useFetch('http://localhost:5000/profile/image', {
        method: 'post',
        body: formData
    })

  console.log(responseData.value)
  console.log(error)
}


</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  z-index: 1000; /* Higher z-index to bring it to the front */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>