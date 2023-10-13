<template>
    <div class=" h-full flex flex-col gap-3 items-center content-center">
        <h3>Sign In</h3>
        <Icon name="simple-icons:cyberdefenders" size="32" />
        <BaseInput v-model:text="email" type="email" placeholder="Email"/>
        <BaseInput v-model:text="password" type="password" placeholder="Password"/>
        <button :disabled="loading" color="gray" @click="onSubmit" class="btn btn-primary w-full max-w-xs">
            {{ loading ? "Loading..." : "Login" }}
        </button>
        <div v-if="errorLogin" class="text-red-500">
            {{ errorLogin }}
        </div>
        <p>
            Don't have an account?
            <NuxtLink to="/register" class="text-primary font-bold">Register</NuxtLink>
        </p>
    </div>
</template>

<script lang="ts" setup>
const { login, errorLogin, loading } = useAuth();
const email = ref<string>("");
const password = ref<string>("");

const onSubmit = async () => {
    await login(email.value, password.value);
    if (errorLogin.value === null) {
        navigateTo("/");
    }
};

</script>