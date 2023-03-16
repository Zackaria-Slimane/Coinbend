import { defineStore } from "pinia";


export const useBudget = defineStore("budgetStore", {
	state: () => {
		return {
			budgetName: null,
			income: null,
			targetsData: null || [],
			targetNames: null || [],
			expensesData: null || [],
			expenseNames: null || [],
		}
	},
	actions: {
		setBudget(newBudget) {
			this.targetsData.push({ ...newBudget })
			this.targetNames.push(newBudget.targetName)
			localStorage.setItem("targets", JSON.stringify(this.budgetData))
		},
		setIncome(newIncome) {
			this.income = newIncome
		},
		setExpense(newExpense) {
			this.expensesData.push({ ...newExpense })
		}
	},
	getters: {
		getBudget: (state) => {
			return state.targetsData;
		},
		getExpenses: (state) => {
			return state.expensesData;
		},
		getIncome: (state) => {
			return state.income;
		},

		getLeftToSpend: (state) => {
			let targets = []
			state.targetsData.forEach((budget) => {
				targets.push(+budget.targetAmount)
			})
			let totalAmounts = targets.reduce((a, b) => a + b, 0)
			let result = parseInt(state.income - totalAmounts)
			return result
		},

		getTargetNames: (state) => {
			let results = []
			state.targetsData.forEach((target) => {
				results.push(target.targetName)
			})
			state.targetNames = results
			return results
		},
		getExpensesNames: (state) => {
			let results = []
			state.expensesData.forEach((expense) => {
				results.push(expense.expenseName)
			})
			state.expenseNames = results
			return results
		}
	},
});
