<template>
  <div>
    <PrimeDataTable :value="products" @rowReorder="onRowReorder" responsiveLayout="scroll"
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

  const products = ref(null);
  const editingRows = ref([]);
  const selection = null;

  const onRowEditSave = (event) => {
    let { newData, index } = event;
    products.value[ index ] = newData;
    $showToast(`Row data updated`, "success", 3000);
  };

  const onRowReorder = (event) => {
    products.value = event.value;
    $showToast(`Row reordered`, "info", 3000);
  };

  setTimeout(() => {
    products.value = [
      {
        id: "1000",
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        progress: 65,
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
      {
        id: "1001",
        code: "nvklal433",
        name: "Black Watch",
        description: "Product Description",
        image: "black-watch.jpg",
        progress: 72,
        category: "Accessories",
        quantity: 61,
        inventoryStatus: "INSTOCK",
        rating: 4,
      },
      {
        id: "1002",
        code: "zz21cz3c1",
        name: "Blue Band",
        description: "Product Description",
        image: "blue-band.jpg",
        progress: 79,
        category: "Fitness",
        quantity: 2,
        inventoryStatus: "LOWSTOCK",
        rating: 3,
      },
      {
        id: "1003",
        code: "244wgerg2",
        name: "Blue T-Shirt",
        description: "Product Description",
        image: "blue-t-shirt.jpg",
        progress: 29,
        category: "Clothing",
        quantity: 25,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
      {
        id: "1004",
        code: "h456wer53",
        name: "Bracelet",
        description: "Product Description",
        image: "bracelet.jpg",
        progress: 15,
        category: "Accessories",
        quantity: 73,
        inventoryStatus: "INSTOCK",
        rating: 4,
      },
      {
        id: "1005",
        code: "av2231fwg",
        name: "Brown Purse",
        description: "Product Description",
        image: "brown-purse.jpg",
        progress: 120,
        category: "Accessories",
        quantity: 0,
        inventoryStatus: "OUTOFSTOCK",
        rating: 4,
      },
      {
        id: "1006",
        code: "bib36pfvm",
        name: "Chakra Bracelet",
        description: "Product Description",
        image: "chakra-bracelet.jpg",
        progress: 32,
        category: "Accessories",
        quantity: 5,
        inventoryStatus: "LOWSTOCK",
        rating: 3,
      },
      {
        id: "1007",
        code: "mbvjkgip5",
        name: "Galaxy Earrings",
        description: "Product Description",
        image: "galaxy-earrings.jpg",
        progress: 34,
        category: "Accessories",
        quantity: 23,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
      {
        id: "1008",
        code: "vbb124btr",
        name: "Game Controller",
        description: "Product Description",
        image: "game-controller.jpg",
        progress: 99,
        category: "Electronics",
        quantity: 2,
        inventoryStatus: "LOWSTOCK",
        rating: 4,
      },
      {
        id: "1009",
        code: "cm230f032",
        name: "Gaming Set",
        description: "Product Description",
        image: "gaming-set.jpg",
        progress: 29,
        category: "Electronics",
        quantity: 63,
        inventoryStatus: "INSTOCK",
        rating: 3,
      },
    ];
    loading.value = false;
  }, 2500);
</script>


<style>
tr:focus {
  outline: 0.15rem solid lightskyblue !important;
}
</style>
