import { useUserStore } from "../stores/user";

export function useAuth() {
  const userStore = useUserStore();
  const errorLogin = ref<String | null>("");
  const errorRegister = ref<String | null>("");

  const register = async (
    email: string,
    name: string,
    password: string,
    repeatPassword: string
  ): Promise<void> => {
    console.log("in composable: " + email, name, password, repeatPassword);
    const res: any = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password, repeatPassword }),
    });
    const data = await res.json();
    console.log("res json composable:", data);

    if (res.ok) {
      console.log("in else of composable");
      errorRegister.value = null;
      console.log("after resetting error value: ", errorRegister.value);
      console.log(data);
    } else {
      errorRegister.value = data.message;
      console.log(errorRegister.value);
    }
  };

  //fix the return type from any to something more specific
  const login = async (email: string, password: string): Promise<any> => {
    console.log("in composable: " + email, password);
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("res json:" + data);

    if (res.ok) {
      console.log("in else of composable");
      errorLogin.value = null;
      console.log("after resetting error value: ", errorLogin.value);
      console.log("login success in composable", data);
      return data;
    } else {
      errorLogin.value = data.error;
      console.log(errorLogin.value);
    }
    console.log(res);
    return res;
  };

  return {
    login,
    register,
    errorLogin,
    errorRegister,
  };
}
