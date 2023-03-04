<template>
	<div>
		<PrimeBtn label="Add target"
			class="p-button-sm p-button-raised p-button-text p-button-info p-1 h-10" icon="pi pi-money-bill"
			@click="openModal" />
		<div class="container w-1/2 mx-auto">

			<PrimeModal header="New Target" v-model:visible="displayModal"
				:breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '40vw' }">
				<div class="mx-8 mt-10">
					<div class="md:grid md:grid-cols-1 md:gap-6">
						<div class="mt-5 md:col-span-2 md:mt-0">

							<div class="overflow-hidden  sm:rounded-md">
								<div class="bg-white px-4 py-5 sm:p-6">
									<div class="grid grid-cols-3 gap-6">
										<div class="col-span-3">
											<label for="budget-name"
												class="block text-sm font-medium text-gray-700">Name</label>
											<input type="text" v-model="budget.targetName" name="target-name"
												id="target-name" autocomplete="target-name"
												placeholder="Groceries, Gas, internet etc ..."
												class="mt-1 block w-full rounded-md border-sky-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
										</div>
										<div class="col-span-3">
											<label for="target-amount"
												class="block text-sm font-medium text-gray-700">Amount
												needed</label>
											<input type="number" v-model="budget.targetAmount" name="target-amount"
												id="target-amount"
												class="mt-1 block w-full rounded-md border-sky-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<template #footer>
					<PrimeBtn label="Cancel" icon="pi pi-times" @click="closeModal"
						class="p-button-text p-button-danger p-button-sm" />
					<PrimeBtn label="Save" class="p-button-sm p-button-raised  p-button-info"
						icon=" pi pi-check" @click="saveTarget" autofocus />
				</template>
			</PrimeModal>
		</div>
	</div>
</template>

<script setup>
	import { ref, reactive } from 'vue';
	import { useBudget } from '~~/stores/budgetStore';

	const { $showToast } = useNuxtApp();
	const storeBudget = useBudget()

	const budget = {
		targetName: null,
		targetAmount: null,
	}

	const displayModal = ref(false);

	const openModal = () => {
		displayModal.value = true;
		budget.targetName = null
		budget.targetAmount = null
	};
	const closeModal = () => {
		displayModal.value = false;
	};

	const saveTarget = () => {
		if (budget.targetName && budget.targetAmount) {
			$showToast(`Budget for  : ${ budget.targetName } added !`, "success", 2500);
			storeBudget.setBudget(budget)
			closeModal()
		}
		else {
			$showToast(`Please fill you target details`, "warning", 5000);
		}
	}




</script>
