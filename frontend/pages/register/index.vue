<template>
    <div class="flex flex-col gap-4 py-5 items-center justify-center">
        <h2>Create your account!</h2>
        <div class="form-control w-full border solid">
            <label class="label">
                <span class="label-text">Name:</span>
            </label>
            <input type="text" placeholder="Name" class="input input-bordered w-full max-w-xs" v-model="user.displayName" />
            <label class="label">
                <span class="label-text">Email:</span>
            </label>
            <input type="text" placeholder="Enter email" class="input input-bordered w-full max-w-xs"
                v-model="user.email" />
            <label class="label">
                <span class="label-text">Password:</span>
            </label>
            <input type="text" placeholder="Password" class="input input-bordered w-full max-w-xs"
                v-model="user.password" />
            <label class="label">
                <span class="label-text">Repeat password:</span>
            </label>
            <input type="text" placeholder="Repeat password" class="input input-bordered w-full max-w-xs"
                v-model="user.repeatPassword" />
            <button class="btn btn-outline" @click="signUp">
                Signup
            </button>
        </div>

    </div>
</template>

<script setup>
const user = ref({
    displayName: "",
    email: "",
    password: "",
    repeatPassword: "",
});




/* const signUp = async () => {
    if (user.password !== user.repeatPassword) {
        alert("Passwords do not match");
        return;
    }
    try {
        const res = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    name: user.value.displayName,
                    email: user.value.email,
                    password: user.value.password
                }
            )
        })
        console.log("response: " + res)
    } catch (e) {
        console.log("err: " + e)
    }
} */
</script>
