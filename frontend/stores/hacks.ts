import { defineStore } from "pinia";
import { HackDetails } from "../types/index";

export const useHackStore = defineStore({
    id: "hacks",
    state: (): {
        hacks: HackDetails[] | null;
    } => ({
        hacks: null,
    }),
    actions: {
        setHacks(newHacks: HackDetails[]): void {
            this.hacks = newHacks;
        },
    },
    getters: {
        getHacks(): HackDetails[] | null {
            return this.hacks;
        },
        getHackById: (state) => (id: number): HackDetails | null => {
            return state.hacks?.find((hack) => hack.id === id) || null;
        },
    },
});
