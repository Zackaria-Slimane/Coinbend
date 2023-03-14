<template>
	<div>
		<PrimeBtn label="Add Income" class="p-button-sm p-button-raised p-button-text p-button-info p-1 h-10"
			icon="pi pi-briefcase" @click="openModal" />
		<div class="container w-1/2 mx-auto">
			<PrimeModal header="New Income" v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
				:style="{ width: '40vw' }">
				<div class="mx-8 mt-10">
					<div class="md:grid md:grid-cols-1 md:gap-6">
						<div class="mt-5 md:col-span-2 md:mt-0">
							<div class="overflow-hidden  sm:rounded-md">
								<div class="bg-white px-4 py-5 sm:p-6">
									<div class="grid grid-cols-3 gap-6">
										<div class="col-span-3">
											<label for="income-amount" class="block text-sm font-medium text-gray-700">Income
												amount</label>
											<input type="number" v-model="income" name="income-amount" id="income-amount"
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
					<PrimeBtn label="Save" class="p-button-sm p-button-raised  p-button-info" icon=" pi pi-check"
						@click="saveIncome"  autofocus />
				</template>
			</PrimeModal>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useBudget } from '~~/stores/budgetStore';


const { $showToast } = useNuxtApp();
const storeBudget = useBudget()

const emit = defineEmits(['add-income'])


const income = ref(null)

const displayModal = ref(false);

const openModal = () => {
	displayModal.value = true;
	income.value = null
};

const closeModal = () => {
	displayModal.value = false;
};

const saveIncome = () => {
	if (income.value) {
		$showToast(`Income of  : ${income.value} saved !`, "success", 2500);
		storeBudget.setIncome(income.value)
		emit('add-income')
		closeModal()
	}
	else {
		$showToast(`Please fill in your income amount`, "warning", 5000);
	}
}

</script>
