export function useAuth(){
    const login = async (email: string, password: string): Promise<void> => {
        console.log("in composable: " + email, password)
        const res = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        
        console.log(res)
    };

    return {
        login
    }
}