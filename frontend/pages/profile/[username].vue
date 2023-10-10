<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <div v-if="error" class="pb-4">
            <AlertError :errorMessage="error?.message" />
        </div>
        <div v-else-if="pending" class="pb-4">
            <AlertLoading />
        </div>
        <!-- <ProfileImage 
        :imageUrl="imageUrl"
        @editProfileImage="showEditProfileImageView"
        /> -->
     
        <ProfileUploadImg
            v-if="showEditProfileImage"
            class="modal-overlay"
            @closeEditProfileImage="closeEditProfileImageView"
            @uploadImage="handleUploadImage"
        />

      <p>{{ user.username }}</p>
      <hr class="w-96 h-1 mx-auto my-4 bg-green-100 border-0 rounded md:my-10 dark:bg-gray-700">

      <p>Completed Hacks</p>
      <ProfileCompletedHacks :user="user"/>
      <img :src="imageUrl" alt="Profile Image" />
    </div>
</template>
  
  

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { User } from "@/types"
import { ref } from 'vue';


const showEditProfileImage = ref(false);
const store = useUserStore()

//const route = useRoute();
//const username = route.params.username as string;

const user: User = ref<User>({
  email: "example@example.com",
  username: "John",
  completedHacks: "",
  points: 10, 
});

const showEditProfileImageView = (): void => {
      showEditProfileImage.value = true;
};

const closeEditProfileImageView = (): void => {
      showEditProfileImage.value = false;
};

const handleUploadImage = async (image: File | null) => {
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
};

// const imageUrl = ref('');

// const { data: imageUrlData, error, pending } = await $fetch<Blob>(
//   "http://localhost:5000/profile",
//   {
//     query: { username: user.value.username },
//     onResponse({ request, response, options }) {
//       if (response.status === 200) {
//         // Access the Blob object and create the URL
//         const blobData = response._data;
//         if (blobData) {
//           imageUrl.value = URL.createObjectURL(blobData);
//         }
//       } else {
//         // Handle the case when the response status is not 200 (e.g., an error occurred)
//         console.error(`Error fetching image. Status: ${response.status}`);
//       }
//     }
//   }
// );

const imageUrl = ref<string>("")

const {data, error, pending} = await useAsyncData('users', async () =>{
  const [img] = await Promise.all([$fetch(
    'http://localhost:5000/profile', 
    {query: {username: user.value.username}}
    )
  ])

  console.log("here now: 111 ", img)
  imageUrl.value = URL.createObjectURL(img)

  console.log("imageUrl: ", imageUrl)

  return{
    imageUrl
  }
})

// const { data: imageUrlData, error, pending } = await useFetch<Blob>(
//   "http://localhost:5000/profile",
//   {
//     query: { username: user.value.username },
//   }
// );

// URL.createObjectURL(imageUrlData);


// console.log("here is the response: " , response)
// const responseData = await response.arrayBuffer();
// const blob = new Blob([responseData], { type: 'image/png' });
// imageUrl.value = URL.createObjectURL(blob);
// console.log("Here is the url: ", imageUrl.value);

// if (response.ok) {
//   const blob = await response.blob();
//   const imageUrl = URL.createObjectURL(blob);
//   console.log("url: ", imageUrl);
// } else {
//   console.error("Failed to fetch profile image");
// }


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