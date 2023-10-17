<template>
    <div class="flex flex-col items-center">
        <div class="navbar bg-gray-900 text-white flex items-center justify-between p-4 space-x-4">
                <div class="text-xl">
                    Password Decipher
                </div>
                <div>
                    <button class="btn" onclick="my_modal_3.showModal()">Level Info</button>
                </div>
            </div>

        <div class="flex flex-col items-center gap-4 mt-5">
            <button class="btn" @click="navigateTo('/passwords/leak')">Back to account details</button>
            <h3>Login with decrypted password</h3>
            <input v-model="username" type="text" placeholder="Username" class="input input-bordered w-full max-w-xs" />
            <input v-model="password" type="password" placeholder="Password" class="input input-bordered w-full max-w-xs" />
            <button class="btn" @click="login">Test Login</button>
        </div>
        <div v-if="wrongCred">
            <p class="text-red-500">Wrong username or password!</p>
        </div>
        <dialog id="my_modal_3" class="modal modal-open" v-if="success">
            <div v-if="loading"><AlertLoading></AlertLoading></div>
            <div v-if="error"><AlertError :errorMessage="error.toString"></AlertError></div>
            <SuccessCard points="8" hackName="Passwords" />
    </dialog>
    </div>
</template>

<script lang="ts" setup>
const username = ref<string>("");
const password = ref<string>("");
const success = ref<boolean>(false);
const wrongCred = ref<boolean>(false);
const {error, newPoints, loading} = useHacking();
const login: () => void = async () => {
    if (username.value === "InternAccount" && password.value === "GoodJob") {
        wrongCred.value = false;
        await newPoints("password");
        if(error.value === null){
            success.value = true;
        }
        else{
            success.value = false;
        }
    } else {
        wrongCred.value = true;
    }
}
</script>