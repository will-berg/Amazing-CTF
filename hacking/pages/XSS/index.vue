<template>
    <div>
        <div class="">
            <div class="navbar bg-gray-800 text-white flex items-center justify-between p-4 space-x-4">
                <div class="text-xl">
                    XSS Hack Page
                </div>
                <div>
                    <button @click="toggleShowCard">Show Info</button>
                </div>
            </div>
            <div>
                <form @submit.prevent="newPost">
                    <input placeholder="Write a post..." v-model="postData" />
                <!-- <select class="" v-model="searchOption">
                <option disabled value="">Please select one</option>
                <option v-for="item in items" :key="item">{{ item }}</option>
            </select> -->
                <button type="submit">Post</button>
                </form>
               
            </div>

            <div class="text-black" v-html="'<h1>Hello, world!</h1>'"></div>

            <div v-if="showCard">
                <InfoCard title="Cross Site Scripting - XSS" :description="descriptionText" />
            </div>


        </div>
    </div>
</template>

<script lang="ts" setup>
const postData: Ref<string> = ref("");
const posts: Ref<string[]> = ref([]);
const showCard: Ref<boolean> = ref(true);
const newPostData: Ref<string> = ref("");
const toggleShowCard = () => {
    showCard.value = !showCard.value;
}

const newPost = () => {
    posts.value.push(postData.value);
    console.log("posts array:" + posts.value)
    console.log("postdata ref:" + postData.value)

    newPostData.value = postData.value;
    console.log("newPostData ref:" + newPostData.value)
    postData.value = "";
    
    alert("You have succesfully posted a new post!")
}

const descriptionText: string = "Cross Site Scripting - XSS, the goal of this hack is to inject and execute the following script into the webpage: "

</script>