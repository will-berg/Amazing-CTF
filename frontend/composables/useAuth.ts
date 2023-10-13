import { useUserStore } from "../stores/user";

export function useAuth() {
  const userStore = useUserStore();
  const errorLogin = ref<String | null>("");
  const errorRegister = ref<String | null>("");
  const loading = ref<boolean>(false);

  const register = async (
    username: string,
    email: string,
    password: string,
    repeatPassword: string
  ): Promise<void> => {
    console.log("in composable: " + email, username, password, repeatPassword);
    loading.value = true;
    try {
      const res: any = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          repeatPassword: repeatPassword,
        }),
      });
      const data = await res.json();
      console.log("res json composable:", data);

      if (res.ok) {
        console.log("in else of composable");
        errorRegister.value = null;
        console.log("after resetting error value: ", errorRegister.value);
        console.log(data);
        loading.value = false;
      } else {
        errorRegister.value = data.message;
        console.log(errorRegister.value);
        loading.value = false;
      }
    } catch (err) {
      console.log(err);
      loading.value = false;
      errorRegister.value = "Server error, please try again";
    }
  };

  //fix the return type from any to something more specific
  const login = async (email: string, password: string): Promise<any> => {
    userStore.testing();
    console.log("in composable: " + email, password);
    loading.value = true;
    try {
      console.log(loading.value);
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
        errorLogin.value = null;
        console.log("after resetting error value: ", errorLogin.value);
        console.log("login success in composable", data);
        userStore.login(data);
        loading.value = false;
      } else {
        errorLogin.value = data.error;
        console.log(errorLogin.value);
        loading.value = false;
      }
      console.log(res);
    } catch (err) {
      console.log(err);
      loading.value = false;
      errorLogin.value = "Server error, please try again";
    }
  };

  return {
    login,
    register,
    errorLogin,
    errorRegister,
    loading,
  };
}
