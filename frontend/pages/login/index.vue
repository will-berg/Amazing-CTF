<template>
    <div class="flex flex-col gap-4">
        <input placeholder="Email" v-model="user.email" />
        <input placeholder="Password" type="password" v-model="user.password" />
        <button color="gray" @click="onSubmit">
            Login
        </button>
    </div>
</template>

<script setup>
const userStore = useUserStore();
const { login }  = useAuth();
const user = ref({
    email: "",
    password: "",
});

const onSubmit = async () => {
    try {
        await login({email: user.value.email, password: user.value.password});
    } catch (e) {
        console.log(e);
    }
};

//add typing to this
/* const login = async () => {
    try {
        const res = await $fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: user.value.email,
                    password: user.value.password
                }
            )
        })
        userStore.login({email: res.user.email, username: res.user.name, token: res.token})
        console.log(res)
        navigateTo('/');
    }catch (e) {
        console.log(e)
    }
} */

</script>