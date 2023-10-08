<template>
    <div class="flex flex-col gap-3 items-center">
        <h3>Sign In</h3>
        <Icon name="simple-icons:cyberdefenders" size="32" />
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

        <button color="gray" @click="login" class="btn btn-primary w-full max-w-xs">
            Login
        </button>
        <p>
            Don't have an account?
            <NuxtLink to="/register" class="text-primary font-bold">Register</NuxtLink>
        </p>
    </div>
</template>

<script lang="ts" setup>
import { User } from "@/types";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const user = reactive({
    email: "",
    password: "",
});

const login = async () => {
    try {
        const res: any = await $fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password,
            }),
        });
        console.log(res);
        // Add fetched user properties to a user object to be stored and persisted in the store
        const u: User = {
            // email: res.user.email,
            // username: res.user.username,
            email: "test@example.com",
            username: "test",
        };
        userStore.login(u);
        router.push("/");
    } catch (e) {
        console.log(e);
    }
};
</script>
