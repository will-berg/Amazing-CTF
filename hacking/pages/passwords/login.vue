<template>
    <div class="flex flex-col items-center">
        <div class="navbar bg-gray-900 text-white flex items-center justify-between p-4 space-x-4">
            <div class="text-xl">
                Passwords Hack Page
            </div>
            <div>
                <TestModal buttonText="Hej" title="hej" />
            </div>
        </div>

        <div class="flex flex-col gap-3 ">
            <h1>Login with secret password</h1>
            <input v-model="username" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
            <input v-model="password" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
            <button class="btn">Test Login</button>
        </div>

        <div v-if="success">
            <SuccessCard points="5" hackName="Passwords" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const username = ref<string>("");
const password = ref<string>("");
const success = ref<boolean>(false);
const login: () => void = () => {
    if (username.value === "admin" && password.value === "admin") {
        alert("You have been logged in!");
        success.value = true;
    } else {
        alert("Wrong username or password!");
    }
}
</script>