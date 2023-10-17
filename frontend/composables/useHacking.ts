import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

export function useHacking(){
    
    const userStore = useUserStore();
    const completedHackMsg = ref<String>("");
    const { user } = storeToRefs(userStore);
    const loading = ref<boolean>(false);
    const error = ref<String | null>("");
    const newPoints = async (hackName: string): Promise<void> => {
        loading.value = true;
        try {
            console.log(loading.value);
            const res = await fetch("http://localhost:5000/submitflag", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + user.value?.token 
                },
                body: JSON.stringify({
                    hackName: hackName,
                    email: userStore.user?.email
                }),
            });
            const data = await res.json();
            console.log("res json composable:", data);
            if (res.ok) {
                loading.value = false;
                error.value = null;
                console.log(data);
                if(data.newPoints){
                    userStore.addPoints(data.newPoints, hackName);
                    console.log("store new data: ", userStore.user)
                }
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