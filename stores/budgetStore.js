import { defineStore } from "pinia";

export const useBudget = defineStore("budgetStore", {
	state: () => ({
		budgetName: null,
		budgetData: [],
	}),
	actions: {
		setBudget(newBudget) {
			this.budgetData.push(newBudget);
		},
	},
	getters: {
		getBudget: (state) => {
			return state.budgetData;
		},
		getTargetNames: (state) => {
		let results = []
		state.budgetData.forEach((budget) => {
			results.push(budget.name)
		})
		return results
		}
	},
});
