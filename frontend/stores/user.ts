import { defineStore } from "pinia";

interface User {
    name: string;
}

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
        userName(): string {
            return this.user?.name ?? "Anonymous";
        },
    },
    // Perform operations on the state
    actions: {
        login(user: User): void {
            this.user = user;
        },
        logout(): void {
            this.user = null;
        },
    },
});

