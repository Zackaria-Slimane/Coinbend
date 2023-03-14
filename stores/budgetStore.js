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

		getLeftToSpend: (state) => {
			let targets = []
			state.budgetData.forEach((budget) => {
				targets.push(+budget.targetAmount)
			})
			let totalAmounts = targets.reduce((a, b) => a + b, 0)
			let result = parseInt(state.income - totalAmounts)
			return result
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
