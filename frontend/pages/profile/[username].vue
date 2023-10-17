<template>
    <div>
        <div v-if="user" class="flex flex-col items-center text-center gap-4">
            <div v-if="error">
                <AlertError :errorMessage="error"></AlertError>
            </div>
            <div v-if="pending">
                <AlertLoading></AlertLoading>
            </div>
            <ProfileImg
                v-else
                :image="generateProfileImageUrl(user.username)"
                @openUploadProfileImage="openUploadProfileImage"
            />
            <hr class="w-80 h-1 my-6 bg-green-100 border-0 rounded">
            <h2>{{ user.username }}</h2>
            <h4>Total Score: {{ user.points }}</h4>
            <hr class="w-80 h-1 my-6 bg-green-100 border-0 rounded">
            <ProfileCompletedHacks :hacks="user.completedHacks" />
            <ProfileUploadImage
                :openModal="open"
                @closeModal="closeUploadProfileImage"
                @uploadImage="uploadProfileImage"
            />
        </div>
    </div>
</template>

<!--Maybe use something like this to display some cool stats: https://daisyui.com/components/stat/-->
<script lang="ts" setup>
import { storeToRefs } from "pinia";
useHead({
    title: "Profile",
});


const store = useUserStore();
const imageUrl = ref<string>("");
const open = ref<boolean>(false);

const error: Ref<null | string> = ref(null);
const pending = ref<boolean>(false);
const { user } = storeToRefs(store);

const uploadProfileImage = async (image: File | null): Promise<void> => {
    if (!user.value) {
        error.value = "No user found";
        return;
    }

    open.value = false;
    console.log("Image", image);

    if (!image) {
        error.value = "No image selected";
        return;
    }

    // Perhaps manually show spinner as we start to upload?
    pending.value = true;

    const formData = new FormData();
    formData.append("username", user.value.username);
    formData.append("image", image, `${user.value.username}_profile_image.png`);

    const {
        data: responseData,
        error: uploadError,
        pending: uploadPending,
    } = await useFetch("http://localhost:5000/profile/image", {
        method: "post",
        body: formData,
    });

    if (responseData.value) {
        imageUrl.value = generateProfileImageUrl(user.value.username);
    } else if (uploadError.value) {
        error.value = "Error uploading the image";
    }

    pending.value = uploadPending.value;
};

function generateProfileImageUrl(username: string): string {
    const queryParams = new URLSearchParams();
    queryParams.append("username", username);
    queryParams.append("date", Date.now().toString());
    return `http://localhost:5000/profile?${queryParams.toString()}`;
}

const openUploadProfileImage = (): void => {
    open.value = true;
};

const closeUploadProfileImage = (): void => {
    open.value = false;
};
</script>

<style></style>
