<template>
    <div>
      <div v-if="user" class="flex flex-col items-center text-center">
        <ProfileImg 
        :image="imageUrl" 
        @openUploadProfileImage="openUploadProfileImage"
        />
        <hr class="w-96 h-1 mx-auto my-4 bg-green-100 border-0 rounded md:my-10 dark:bg-gray-700">
        <h2>{{ user.username }}</h2>
        <h4>Total Score: {{ user.points }}</h4>
        <hr class="w-96 h-1 mx-auto my-4 bg-green-100 border-0 rounded md:my-10 dark:bg-gray-700">
        <ProfileCompletedHacks :hacks="user.completedHacks" />
        <ProfileUploadImage 
        :openModal="open"
        @closeModal="closeUploadProfileImage"
        @uploadImage="uploadProfileImage"
        />
      </div>
    </div>
</template>
  

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { User } from "@/types"
import { ref } from 'vue';
import { storeToRefs } from "pinia";

const store = useUserStore()
const imageUrl = ref<string>("");
const open = ref<boolean>(false);
const imageKey = ref<number>(0);
//const { user } = storeToRefs(store);


const user: User = ref<User>({
  email: "example@example.com",
  username: "Regularclip",
  completedHacks: ['SQLInject', 'ReDos', 'XSS-easy', 'XSS-hard'],
  points: 175, 
});

const queryParams = new URLSearchParams();
queryParams.append('username', user.value.username);
queryParams.append('date', Date.now().toString());
const url = `http://localhost:5000/profile?${queryParams.toString()}`;
imageUrl.value = url;

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

  const { data: responseData, error, pending } = await useFetch(
    'http://localhost:5000/profile/image', 
    {
        method: 'post',
        body: formData
    }
  )
    if(responseData.value){
      const queryParams = new URLSearchParams();
      queryParams.append('username', user.value.username);
      queryParams.append('date', Date.now().toString());
      const url = `http://localhost:5000/profile?${queryParams.toString()}`;
      imageUrl.value = url;
    }
}

const openUploadProfileImage = () : void => {
  open.value = true
}

const closeUploadProfileImage = () : void => {
  open.value = false;
}

</script>

<style>
</style>