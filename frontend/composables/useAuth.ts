export function useAuth(){
    const errorLogin = ref<String | null>("")
    const errorRegister = ref<String | null>("")

    const register = async (email: string, name: string, password: string): Promise<void> => {
        console.log("in composable: " + email, name, password)
        const res: any = await $fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, name, password})
        })
        console.log(res.json())

        if(res.status != 200){
            errorRegister.value = res.error.message
            console.log(errorRegister.value)
        }else{
            errorRegister.value = null
            console.log(res)
        }
    };
    

    //fix the return type from any to something more specific
    const login = async (email: string, password: string): Promise<any> => {
        console.log("in composable: " + email, password)
        const res = await $fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        console.log(res)
        return res
    };


    return {
        login,
        register,
        errorLogin,
        errorRegister
    }
}