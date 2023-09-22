<template>
    <div class="flex flex-col gap-4">
        <input placeholder="Name" v-model="user.displayName" />
        <input placeholder="you@example.com" v-model="user.email" />
        <input placeholder="Password" type="password" v-model="user.password" />
        <input placeholder="Repeat Password" type="password" v-model="user.repeatPassword" />

        <button color="gray" @click="signup">
            Signup
        </button>
    </div>
</template>

<script setup>
import { createUserWithEmailAndPassword } from "firebase/auth";
const user = reactive({
    displayName: "",
    email: "",
    password: "",
    repeatPassword: "",
});
const auth = useFirebaseAuth();
const router = useRouter();
const signup = () => {
    if (user.password !== user.repeatPassword) {
        alert("Passwords do not match");
        return;
    }
    
    createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(() => {
            alert("User Created");
            const user = useCurrentUser();
            console.log(user)
            router.push("/login")
        })
        .catch((error) => {
            console.error(error);
            alert("ERROR while creating USER");
        });
};
</script>
