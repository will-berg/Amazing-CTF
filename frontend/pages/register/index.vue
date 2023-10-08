<template>
    <div class="flex flex-col gap-3 items-center">
        <h3>Create Account</h3>
        <Icon name="simple-icons:cyberdefenders" size="32" />
        <input
            placeholder="Name"
            v-model="user.displayName"
            class="input input-bordered w-full max-w-xs"
        />
        <input
            placeholder="Email"
            v-model="user.email"
            class="input input-bordered w-full max-w-xs"
        />
        <input
            placeholder="Password"
            type="password"
            v-model="user.password"
            class="input input-bordered w-full max-w-xs"
        />
        <input
            placeholder="Repeat Password"
            type="password"
            v-model="user.repeatPassword"
            class="input input-bordered w-full max-w-xs"
        />

        <button color="gray" @click="signUp" class="btn btn-primary w-full max-w-xs">
            sign up
        </button>
        <p>
            Already have an account?
            <NuxtLink to="/login" class="text-primary font-bold">Login</NuxtLink>
        </p>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const user = reactive({
    displayName: "",
    email: "",
    password: "",
    repeatPassword: "",
});

const signUp = async () => {
    if (user.password !== user.repeatPassword) {
        alert("Passwords do not match");
        return;
    }
    try {
        const res = await $fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: user.displayName,
                email: user.email,
                password: user.password,
            }),
        });
        // If we get here it means the user was successfully created
        console.log(res);
        router.push("/login");
    } catch (e) {
        console.log(e);
    }
};
</script>
