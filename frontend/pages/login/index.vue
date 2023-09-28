<template>
    <div class="flex flex-col gap-4">
        <input placeholder="Email" v-model="user.email" />
        <input placeholder="Password" type="password" v-model="user.password" />
        <button color="gray" @click="login">
            Login
        </button>
    </div>
</template>

<script setup>
const user = reactive({
    email: "",
    password: "",
});

const login = async () => {
    try {
        const res = await $fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
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