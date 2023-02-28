import { defineStore } from "pinia";
import { useTargetStore } from "./targetStore";

export const expenseTarget = defineStore("expenseStore", {
	state: () => ({
		expenseName: null,
		expenseAmount: null,
		relatedTarget: null,
	}),
	actions: {
		setExpense({ expenseName, expenseAmount, relatedTarget }) {
			this.expenseAmount = expenseAmount;
			this.expenseName = expenseName;
			this.relatedTarget = relatedTarget;
		},
	},
	getters: {
		getPercentage: (state) => {
			const Target = useTargetStore();
			let diference = +state.expenseAmount / +Target.targetAmount;
			let percent = diference * 100;
			return `*${percent} % `;
		},
	},
});
