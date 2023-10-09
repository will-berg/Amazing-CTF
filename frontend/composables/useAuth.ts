export function useAuth(){
    
    const register = async (email: string, name: string, password: string): Promise<void> => {
        console.log("in composable: " + email, name, password)
        const res = await $fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, name, password})
        })
        console.log(res)
    };
    
    const login = async (email: string, password: string): Promise<void> => {
        console.log("in composable: " + email, password)
        const res = await $fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        console.log(res)
    };

    return {
        login,
        register
    }
}