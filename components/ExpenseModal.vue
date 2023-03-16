<template>
	<div>
		<PrimeBtn label="Add expense" class="p-button-sm p-button-raised p-button-text p-button-info p-1 h-10"
			icon="pi pi-dollar" @click="openModal" />
		<div class="container w-1/2 mx-auto">
			<PrimeModal header="New expense" v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
				:style="{ width: '40vw' }">
				<div class="mx-8 mt-10">
					<div class="md:grid md:grid-cols-1 md:gap-6">
						<div class="mt-5 md:col-span-2 md:mt-0">
							<div class="overflow-hidden  sm:rounded-md">
								<div class="bg-white px-4 py-5 sm:p-6">
									<div class="grid grid-cols-3 gap-6">
										<div class="col-span-3">
											<label for="expense-name" class="block text-sm font-medium text-gray-700">Name</label>
											<input type="text" v-model.lazy="expense.expenseName" name="expense-name" id="expense-name"
												autocomplete="expenseName" placeholder="Groceries , gas , food etc.."
												class="mt-1 block w-full rounded-md border-sky-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
										</div>

										<div class="col-span-3">
											<label for="expense-amount" class="block text-sm font-medium text-gray-700">Amount
											</label>
											<input type="number" v-model.lazy="expense.expenseAmount" name="expense-amount" id="expense-amount"
												placeholder="100 $ , 50 DH etc..."
												class="mt-1 block w-full rounded-md border-sky-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
										</div>

										<div class="col-span-3">
											<label for="relatedTarget" class="block text-sm font-medium text-gray-700">Deduct from
											</label>
											<select v-model="expense.relatedTarget" id="relatedTarget" name="relatedTarget" autocomplete="target-name"
												class="mt-1 block w-full rounded-md border border-sky-300 bg-white py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm">
												<option  v-for="target in targets" :value="target" :key="target">
													{{ target }}
												</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<template #footer>
					<div class="mt-8">
						<PrimeBtn label="Cancel" icon="pi pi-times" @click="closeModal"
							class="p-button-text p-button-danger p-button-sm" />
						<PrimeBtn label="Save" class="p-button-sm p-button-raised  p-button-info" icon=" pi pi-check"
							@click="closeModal" autofocus />
					</div>
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

const emit = defineEmits(['refresh-history'])

const expense = reactive({
	expenseName: null,
	expenseAmount: null,
	relatedTarget: null
})

let targets = reactive([])

const displayModal = ref(false);

const openModal = () => {
	targets = storeBudget.getTargetNames
	expense.expenseName= null,
	expense.expenseAmount= null,
	expense.relatedTarget= null
	displayModal.value = true;
};
const closeModal = () => {
	displayModal.value = false;
	storeBudget.setExpense(expense)
	emit('refresh-history')
};



</script>
