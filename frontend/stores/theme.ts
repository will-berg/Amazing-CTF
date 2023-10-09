import { defineStore } from "pinia";

export const useThemeStore = defineStore({
	id: "theme",
	state: (): {
		theme: string;
	} => ({
		theme: "dark",
	}),
	persist: true,
	actions: {
		toggleTheme(): void {
			this.theme = this.theme === "light" ? "dark" : "light";
		},
	},
});
