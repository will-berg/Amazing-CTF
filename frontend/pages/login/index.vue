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
import { signInWithEmailAndPassword } from "firebase/auth";
const user = reactive({
    email: "",
    password: "",
});
const router = useRouter();
const auth = useFirebaseAuth();
const login = () => {
    signInWithEmailAndPassword(auth, user.email, user.password)
        .then(() => {
            alert("User Logged In");
            const user = useCurrentUser();
            console.log(user)
            router.push("/")
        })
        .catch((error) => {
            console.error(error);
            alert("ERROR while logging in");
        });
}
</script>