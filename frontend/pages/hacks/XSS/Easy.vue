<template>
    <div>
        <div class="flex flex-col items-center ">
            <div class="navbar bg-gray-900 text-white flex items-center justify-between p-4 space-x-4">
                <div class="text-xl">
                    XSS Hack Page - Easy
                </div>
                <div>
                    <button class="btn" onclick="my_modal_3.showModal()">Level Info</button>
                </div>
            </div>
            <div class="flex flex-col gap-3 w-80 items-center">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-bold">Diary entry #{{ posts.length + 1 }}</span>
                    </label>
                    <textarea placeholder="Make an entry.." class="textarea textarea-bordered textarea-lg w-80"
                        v-model="postData"></textarea>
                </div>
                <button class="btn btn-outline w-40" @click="newPost()">Post</button>
                <div class="chat chat-start" v-for="(entry, index) in posts" :key="index">
                    <div class="chat-bubble font-bold">Diary entry #{{ index + 1 }}: {{ entry }}</div>
                </div>

            </div>

            <dialog id="my_modal_3" :class="{ 'modal': true, 'modal-open': showModal }">
                <div class="modal-box">
                    <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            @click="closeModal">✕</button>
                    </form>
                    <h3 class="font-bold text-lg">Cross Site Scripting - XSS</h3>
                    <p class="text-sm">Easy Difficulty</p>
                    <p class="py-4">You have discovered a vulnerable web page which allows you to upload diary entries which
                        are rendered.</p>
                    <p class="py-4">The goal of the hack is to inject the following script onto the webpage and execute it
                        using script tags:
                    </p>
                    <p class="py-4 font-bold">alert("You have been hacked!");</p>
                </div>
            </dialog>

            <dialog id="my_modal_3" class="modal modal-open" v-if="completed">
                <div v-if="loading">
                    <span class="loading loading-spinner loading-lg"></span>
                </div>
                <SuccessCard points="5" hackName="xss-easy" />
            </dialog>

        </div>
    </div>
</template>

<script lang="ts" setup>
const postData: Ref<string> = ref("");
const posts: Ref<string[]> = ref([]);
const scriptEndTag = "</" + "script>"
const showModal = ref<boolean>(true);
const completed = ref<boolean>(false);
// double check this pattern against different inputs
const xsspattern = /<script.*?>\s*alert\(\s*["']You have been hacked!["']\s*\)\s*;?\s*<\/script>/i;
const closeModal = (): void => {
    showModal.value = false;
}
const { error, newPoints, loading } = useHacking();

const newPost = async (): Promise<void> => {
    console.log("postdata: " + postData.value)
    console.log("<script>alert(\"You have been hacked!\");" + scriptEndTag)
    if (xsspattern.test(postData.value)) {
        alert("You have been hacked!");
        postData.value = "";
        //call success function here to get flag
        await newPoints("XSS-Easy");
        completed.value = true;
    }
    posts.value.push(postData.value);
    postData.value = "";
}
</script>