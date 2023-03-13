import { defineStore } from "pinia";


export const useBudget = defineStore("budgetStore", {
	state: () => {
		return {
			budgetName: null,
			income: null,
			budgetData: null || [],
			targetNames: null || []
		}
	},
	actions: {
		setBudget(newBudget) {
			this.budgetData.push({ ...newBudget })
			this.targetNames.push(newBudget.targetName)
			localStorage.setItem("budget", JSON.stringify(this.budgetData))
		},
		setIncome(newIncome) {
			this.income = newIncome
		}
	},
	getters: {
		getBudget: (state) => {
			return state.budgetData;
		},

		getIncome: (state) => {
			return state.income;
		},

		getTargetNames: (state) => {
			let results = []
			state.budgetData.forEach((budget) => {
				results.push(budget.targetName)
			})
			state.targetNames = results
			return results
		}
	},
});
