<template>
	<div>

		<PrimeBtn label="Add expense"
			class="p-button-sm p-button-raised p-button-text p-button-info p-1 h-10"
			icon="pi pi-dollar" @click="openModal" />
		<div class="container w-1/2 mx-auto">

			<PrimeModal header="New expense" v-model:visible="displayModal"
				:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
				:style="{ width: '40vw' }">
				<div class="mx-8 mt-10">
					<div class="md:grid md:grid-cols-1 md:gap-6">
						<div class="mt-5 md:col-span-2 md:mt-0">

							<div class="overflow-hidden  sm:rounded-md">
								<div class="bg-white px-4 py-5 sm:p-6">
									<div class="grid grid-cols-3 gap-6">
										<div class="col-span-3">
											<label for="budget-name"
												class="block text-sm font-medium text-gray-700">Name</label>
											<input type="text" v-model="budgetName"
												name="budget-name" id="budget-name"
												autocomplete="name"
												class="mt-1 block w-full rounded-md border-sky-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
										</div>

										<div class="col-span-3">
											<label for="currency"
												class="block text-sm font-medium text-gray-700">Target</label>
											<select id="currency" name="currency"
												autocomplete="currency-name"
												v-model="selectedTarget"
												class="mt-1 block w-full rounded-md border border-sky-300 bg-white py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm">
												<option v-for="target in targets"
													:value="target.value" :key="target.value">
													{{ target.name }}
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
					<PrimeBtn label="Cancel" icon="pi pi-times" @click="closeModal"
						class="p-button-text p-button-danger p-button-sm" />
					<PrimeBtn label="Save" class="p-button-sm p-button-raised  p-button-info"
						icon=" pi pi-check" @click="closeModal" autofocus />
				</template>
			</PrimeModal>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
const displayModal = ref(false);

const openModal = () => {
	displayModal.value = true;
};
const closeModal = () => {
	displayModal.value = false;
};

const budgetName = ref(null)
const selectedTarget = ref(null)
const targets = []
</script>
