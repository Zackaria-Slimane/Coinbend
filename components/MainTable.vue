<template>
	<div>
		<PrimeDataTable :value="budget" editMode="cell" @cell-edit-complete="onCellEditComplete" class="editable-cells-table" responsiveLayout="scroll" :loading="loading" loadingIcon="pi pi-spinner">
			<template #loading> Loading your data, please wait... </template>
			<PrimeCol :header="columns[0].header" :field="columns[0].field"><template
					#editor="{ data, field }">
					<PrimeText v-model="data[field]" />
				</template>
			</PrimeCol>

			<PrimeCol :header="columns[1].header" :field="columns[1].field">
				<template #editor="{ data, field }">
					<PrimeText v-model="data[field]" />
				</template>
			</PrimeCol>
			<PrimeCol :header="columns[2].header" :field="columns[2].field">
				<template #editor="{ data, field }">
					<PrimeText v-model="data[field]" />
				</template>
			</PrimeCol>

			<PrimeCol :header="columns[3].header" :field="columns[3].field">
				<template #body="slotProps">
					<PrimeBar :value="slotProps.data.progress" style="height: .5em"
						:showValue="true" />
				</template>
			</PrimeCol>

		</PrimeDataTable>
	</div>
</template>

<script setup>
import { useBudget } from "~~/stores/budgetStore";
import { ref } from "vue";

const loading = ref(true);

const columns = [
	{ field: "targetName", header: "Name" },
	{ field: "targetAmount", header: "Target" },
	{ field: "saved", header: "Saved" },
	{ field: "progress", header: "Progress" },
];

const budgetStore = useBudget()
const budget = budgetStore.getBudget || JSON.parse(localStorage.getItem("budget"))

const onCellEditComplete = (event) => {
	let { data, newValue, field } = event;

	switch (field) {
		case 'targetAmount':
		case 'saved':
			if (isPositiveInteger(newValue))
				data[field] = newValue;
			else
				event.preventDefault();
			break;

		default:
			if (newValue.trim().length > 0)
				data[field] = newValue;
			else
				event.preventDefault();
			break;
	}
};
const isPositiveInteger = (val) => {
	let str = String(val);
	str = str.trim();
	if (!str) {
		return false;
	}
	str = str.replace(/^0+/, "") || "0";
	var n = Math.floor(Number(str));
	return n !== Infinity && String(n) === str && n >= 0;
};

setTimeout(() => {
	loading.value = false;
}, 2500);
</script>


<style>
tr:focus {
	outline: 0.15rem solid lightskyblue !important;
}

.p-progressbar-value {
	background: rgb(43, 188, 43) !important;
}</style>
