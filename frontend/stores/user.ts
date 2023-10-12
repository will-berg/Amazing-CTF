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
        login(user: User): void {
            this.user = user;
            console.log("Logged in as", this.user)
        },
        logout(): void {
            this.user = null;
        },
    },
});
