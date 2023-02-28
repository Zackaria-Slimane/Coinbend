import { defineStore } from "pinia";

export const useTargetStore = defineStore("targetStore", {
	state: () => ({
		targetName: null,
		targetAmount: null,
	}),
	actions: {
		setTarget({ targetName, targetAmount }) {
			this.targetName = targetName;
			this.targetAmount = targetAmount;
		},
	},
});
