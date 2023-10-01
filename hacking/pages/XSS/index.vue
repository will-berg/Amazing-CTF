<template>
    <div>
        <h2> Cross Site Scripting - XSS </h2>
        <div>The goal of this hack is to inject and execute the following script into the webpage below:</div>
        <div>&lt;script&gt;alert('Congratulations on completing the hack!');&lt;/script&gt;</div>
        <div class="">
            <div class="navbar rounded-lg bg-gray-800 text-white flex items-center justify-between p-4 space-x-4">
                <div class="text-xl">
                    Welcome to HackUs.com - The best place to learn about hacking!
                </div>
            </div>
            <input placeholder="Search..." v-model="searchData"/>
            <select class="" v-model="searchOption">
                <option disabled value="">Please select one</option>
                <option v-for="item in items" :key="item">{{ item }}</option>
            </select>
            <button class="">Search</button>
            <div>{{ searchData }}</div>

            <InfoCard title="Cross Site Scripting - XSS" description=""/>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const searchData = ref("");
    const items = ["test1", "test2", "test3"];
    const searchOption = ref("");

</script>