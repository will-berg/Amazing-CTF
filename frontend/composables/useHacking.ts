import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

export function useHacking(){
    
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    const loading = ref<boolean>(false);
    const error = ref<String | null>("");
    console.log("localstorage user: ", user.value?.token);
    const newPoints = async (hackName: string): Promise<void> => {
        console.log("in hacking composable: " + hackName);
        loading.value = true;
        //console.log("token in composable: ", userStore.userToken)
        try {
            console.log(loading.value);
            const res = await fetch("http://localhost:5000/submitflag", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " ,
                },
                body: JSON.stringify({
                    hackName: hackName,
                    email: userStore.user?.email
                }),
            });
            const data = await res.json();
            console.log("res json composable:", data);
            if (res.ok) {
                console.log("in else of composable");
                console.log(data);
                loading.value = false;
                error.value = null;
                userStore.addPoints(data.newPoints, hackName);
                console.log("store new data: ", userStore.user)
            } else {
                console.log(data);
                error.value = data.message;
                loading.value = false;
            }
        } catch (err) {
            console.log(err);
            error.value = "Something Went Wrong";
            loading.value = false;
        }
    }  

    return {
        newPoints,
        loading,
        error,
    }

}