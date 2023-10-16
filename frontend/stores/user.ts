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
        userToken(): string {
            return this.user?.token ?? "";
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
            localStorage.removeItem("user");
        },
        addPoints(points: number, newHack: string): void {
            this.user!.points += points;
            this.user!.completedHacks.push(newHack);
        },
    },
});
