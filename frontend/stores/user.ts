import { defineStore } from "pinia";
import { User } from "../types/index";

export const useUserStore = defineStore({
    id: "user",
    // Data that the store manages
    state: (): {
        user: User | null;
    } => ({
        user: null,
    }),
    // Computed properties of the state
    getters: {
        userEmail(): string {
            return this.user?.email ?? "Anonymous";
        },
    },
    // Perform operations on the state
    actions: {
		initUserFromLocalStorage() {
            if (process.client) {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    this.user = JSON.parse(storedUser);
                }
            }
        },
        login(user: User): void {
            this.user = user;
            console.log("Logged in as", this.user)
			// Save user state to local storage
			if (process.client) {
				localStorage.setItem("user", JSON.stringify(user));
			}
        },
        logout(): void {
            this.user = null;
			// Remove user state from local storage
			if (process.client) {
				localStorage.removeItem("user");
			}
        },
    },
});
