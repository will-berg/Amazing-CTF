<template>
    <div>
        <div class="flex flex-col items-center ">
            <div class="navbar bg-gray-900 text-white flex items-center justify-between p-4 space-x-4">
                <div class="text-xl">
                    XSS Hack Page - Medium
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
                    <div class="chat-bubble font-bold ">Diary entry #{{ index + 1 }}: {{ entry }}</div>
                </div>

            </div>

            <dialog id="my_modal_3" :class="{ 'modal': true, 'modal-open': showModal }">
                <div class="modal-box">
                    <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            @click="closeModal">✕</button>
                    </form>
                    <h3 class="font-bold text-lg">Cross Site Scripting - XSS</h3>
                    <p class="text-sm">Medium Difficulty</p>
                    <p class="py-4">The owners of the web page you discovered has patched the hack by implementing a
                        sanitizer which
                        detects script tags in your input and removes them.
                    </p>
                    <p class="py-4">The goal this time is to find some way to circumvent the sanitization and execute the
                        following script:
                    </p>
                    <p class="py-4 font-bold">alert("You have been hacked!");</p>
                </div>
            </dialog>

            <dialog id="my_modal_3" class="modal modal-open" v-if="completed">
                <SuccessCard points="10" hackName="xss-medium" />
            </dialog>
        </div>
    </div>
</template>

<script lang="ts" setup>
const postData: Ref<string> = ref("");
const posts: Ref<string[]> = ref([]);
const myVar = "</" + "script>"
const completed = ref<boolean>(false);
const xsspattern = /<script.*?>\s*alert\(\s*["']you have been hacked!["']\s*\)\s*;?\s*<\/script>/i;
const xsspattern2 = /<img.*?onerror=alert\(\s*["']you have been hacked!["']\s*\)\s*;?\s*\/>/i;
const showModal = ref<boolean>(true);
const closeModal = (): void => {
    showModal.value = false;
}

//should probably make a file for these functions and import them here
const newPost = (): void => {
    console.log("postdata: " + postData.value)
    console.log("<script>alert(\"You have been hacked!\");" + myVar)
    postData.value = sanitizeData(postData.value);
    //should improve the check to only look for containing the different parts to not restrict the user input
    if (xsspattern.test(postData.value) || xsspattern2.test(postData.value)) {
        alert("You have been hacked!");
        completed.value = true;
        postData.value = "";
        //call success function here to get flag
    }
    posts.value.push(postData.value);
    postData.value = "";
}

const sanitizeData = (data: string): string => {
    return data.replace(/<script>/g, '').replace(/<\/script>/g, '');
}
</script>