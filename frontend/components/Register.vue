<template>
    <div class="flex flex-col gap-3 items-center">
        <h3>Create Account</h3>
        <Icon name="simple-icons:cyberdefenders" size="32" />
        <BaseInput placeholder="Username" v-model:text="username" class="input input-bordered w-full max-w-xs"
            type="text" />
        <BaseInput placeholder="Email" v-model:text="email" class="input input-bordered w-full max-w-xs" type="text" />
        <BaseInput placeholder="Password" v-model:text="password" class="input input-bordered w-full max-w-xs"
            type="password" />
        <BaseInput placeholder="Repeat Password" v-model:text="repeatPassword" class="input input-bordered w-full max-w-xs"
            type="password" />
        <div v-if="errorRegister" class="text-red-500">
            {{ errorRegister }}
        </div>
        <button color="gray" :disabled="loading" @click="signUp" class="btn btn-primary w-full max-w-xs">
            {{ loading ? "Loading..." : "Register" }}
        </button>
        <p>
            Already have an account?
            <NuxtLink to="/login" class="text-primary font-bold">Login</NuxtLink>
        </p>
    </div>
</template>

<script lang="ts" setup>
const { register, errorRegister, loading } = useAuth();

const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const repeatPassword = ref<string>("");

const signUp = async () => {
    await register(username.value, email.value, password.value, repeatPassword.value);
    console.log("in try: " + errorRegister.value)
    if (errorRegister.value === null) {
        navigateTo("/login?registered=true");
    }
};
</script>