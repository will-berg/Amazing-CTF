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

        <div class="flex flex-col gap-3 mt-5">
            <button class="btn btn-primary" @click="navigateTo('/passwords/leak')">Back to account details</button>
            <h1>Login with secret password</h1>
            <input v-model="username" type="text" placeholder="Username" class="input input-bordered w-full max-w-xs" />
            <input v-model="password" type="password" placeholder="Password" class="input input-bordered w-full max-w-xs" />
            <button class="btn" @click="login">Test Login</button>
        </div>
        <div v-if="wrongCred">
            <p class="text-red-500">Wrong username or password!</p>
        </div>
        <dialog id="my_modal_3" class="modal modal-open" v-if="success">
            <SuccessCard points="10" hackName="Passwords" />
    </dialog>
    </div>
</template>

<script lang="ts" setup>
const username = ref<string>("");
const password = ref<string>("");
const success = ref<boolean>(false);
const wrongCred = ref<boolean>(false);
const login: () => void = () => {
    if (username.value === "InternAccount" && password.value === "GoodJob") {
        wrongCred.value = false;
        success.value = true;
    } else {
        wrongCred.value = true;
    }
}
</script>