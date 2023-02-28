import { defineStore } from "pinia";

export const useBudget = defineStore("budgetStore", {
	state: () => ({
		budgetName: null,
		budgetData: [{ target: null, amount: null, percent: null }],
	}),
	actions: {
		setBudget(budgetData) {
			this.budgetData = budgetData;
		},
	},
	getters: {
		getBudget: (state) => {
			return state.budgetData;
		},
	},
});
