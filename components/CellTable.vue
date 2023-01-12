<template >
  <div class="mt-24">
    <PrimeDataTable :value="productsTest" editMode="row" dataKey="id" v-model:selection="products"
      selectionMode="single" v-model:editingRows="editingRows" @row-edit-save="onRowEditSave"
      responsiveLayout="scroll" :loading="loading" loadingIcon="pi pi-spinner">
      <template #loading>
        Loading your data, please wait...
      </template>
      <PrimeCol field="code" header="Code" style="width:20%">
        <template #editor="{ data, field }">
          <PrimeText v-model="data[field]" autofocus />
        </template>
      </PrimeCol>
      <PrimeCol field="name" header="Name" style="width:20%">
        <template #editor="{ data, field }">
          <PrimeText v-model="data[field]" />
        </template>
      </PrimeCol>
      <PrimeCol field="price" header="Price" style="width:20%">
        <template #editor="{ data, field }">
          <PrimeText v-model="data[field]" />
        </template>
      </PrimeCol>
      <PrimeCol :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center">
      </PrimeCol>
    </PrimeDataTable>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  const editingRows = ref([]);
  const loading = ref(true)
  const products = null

  const columns = ref([
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name' },
    { field: 'price', header: 'Price' }
  ]);

  const productsTest = ref(null)

  const onRowEditSave = (event) => {
    let { newData, index } = event;
    productsTest.value[ index ] = newData;
  };

  setTimeout(() => {
    productsTest.value = [ {
      code: 1, name: "spending 1", price: 77, status: 'in progress'
    },
    {
      code: 123, name: "spending 2 ", price: 177, status: 'target met '
    },
    {
      code: 133, name: "spending 3", price: 7337, status: 'over budget'
    },
    {
      code: 181, name: "spending 4 ", price: 19, status: 'target met'
    } ]

    loading.value = false
  }, 2500)


</script>
