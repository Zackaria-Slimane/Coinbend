<template>
	<div>
		<PrimeDataTable :value="budget" @rowReorder="onRowReorder" responsiveLayout="scroll"
			editMode="row" dataKey="id" v-model:selection="selection" selectionMode="single"
			v-model:editingRows="editingRows" @row-edit-save="onRowEditSave" :loading="loading"
			loadingIcon="pi pi-spinner">
			<template #loading> Loading your data, please wait... </template>

			<PrimeCol :rowReorder="true" headerStyle="width: 3rem" />

			<!-- <PrimeCol v-for="col of columns" :field="col.field" :header="col.header" :key="col.field">
        <template #editor="{ data, field }">
          <PrimeText v-model="data[field]" />
        </template>
      </PrimeCol> -->

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
					<PrimeBar :value="slotProps.data.progress" style="height: .5em" :showValue="false" />
				</template>
			</PrimeCol>

			<PrimeCol :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
			</PrimeCol>

			<PrimeCol style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
				<PrimeBtn icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-outlined" />
			</PrimeCol>
		</PrimeDataTable>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	const { $showToast } = useNuxtApp();
	const loading = ref(true);

	const columns = [
		{ field: "name", header: "Name" },
		{ field: "quantity", header: "Target" },
		{ field: "quantity", header: "Saved" },
		{ field: "progress", header: "Progress" },
	];

	const budget = ref(null);
	const editingRows = ref([]);
	const selection = null;

	const onRowEditSave = (event) => {
		let { newData, index } = event;
		budget.value[ index ] = newData;
		$showToast(`Row data updated`, "success", 3000);
	};

	const onRowReorder = (event) => {
		budget.value = event.value;
		$showToast(`Row reordered`, "info", 3000);
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
}
</style>
