<template>
    <div class="flex flex-col gap-4">
        <input placeholder="Name" v-model="user.displayName" />
        <input placeholder="you@example.com" v-model="user.email" />
        <input placeholder="Password" type="password" v-model="user.password" />
        <input placeholder="Repeat Password" type="password" v-model="user.repeatPassword" />

        <button color="gray" @click="signUp">
            Signup
        </button>
    </div>
</template>

<script setup>
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
        const res = await $fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    name: user.displayName,
                    email: user.email,
                    password: user.password
                }
            )
        })
        console.log(res)
    }catch (e) {
        console.log(e)
    }
}
</script>
