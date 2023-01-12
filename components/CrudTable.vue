<template>
  <div>
    <div class="card mt-48">
      <Toolbar class="mb-4">

        <template #start>
          <PrimeBtn label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
          <PrimeBtn label="Delete" icon="pi pi-trash" class="p-button-danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedProducts || !selectedProducts.length" />
        </template>

        <template #end>
          <PrimeBtn label="Export" icon="pi pi-upload" class="p-button-help"
            @click="exportCSV($event)" />
        </template>

      </Toolbar>

      <PrimeDataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        responsiveLayout="scroll">
        <template #header>
          <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center">Manage Products</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <PrimeText v-model="filters['global'].value" placeholder="Search..." />
            </span>
          </div>
        </template>

        <PrimeCol selectionMode="multiple" style="width: 3rem" :exportable="false"></PrimeCol>
        <PrimeCol field="code" header="Code" :sortable="true" style="min-width:12rem"></PrimeCol>
        <PrimeCol field="name" header="Name" :sortable="true" style="min-width:16rem"></PrimeCol>
        <PrimeCol field="price" header="Price" :sortable="true" style="min-width:8rem">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
          </template>
        </PrimeCol>

        <PrimeCol field="category" header="Category" :sortable="true" style="min-width:10rem">
        </PrimeCol>
        <PrimeCol field="inventoryStatus" header="Status" :sortable="true" style="min-width:12rem">
          <template #body="slotProps">
            <span
              :class="'product-badge status-' + (slotProps.data.inventoryStatus ? slotProps.data.inventoryStatus.toLowerCase() : '')">{{
                slotProps.data.inventoryStatus
              }}</span>
          </template>
        </PrimeCol>

        <PrimeCol :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <PrimeBtn icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
              @click="editProduct(slotProps.data)" />
            <PrimeBtn icon="pi pi-trash" class="p-button-rounded p-button-warning"
              @click="confirmDeleteProduct(slotProps.data)" />
          </template>
        </PrimeCol>

      </PrimeDataTable>
    </div>

    <PrimeModal v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details"
      :modal="true" class="p-fluid">

      <div class="field">
        <label for="name">Name</label>
        <PrimeText id="name" v-model.trim="product.name" required="true" autofocus
          :class="{ 'p-invalid': submitted && !product.name }" />
        <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <PrimeText id="description" v-model="product.description" required="true" rows="3"
          cols="20" />
      </div>

      <div class="field">
        <label for="inventoryStatus" class="mb-3">Inventory Status</label>
        <PrimeSelect id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses"
          optionLabel="label" placeholder="Select a Status">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span :class="'product-badge status-' + slotProps.value.value">{{
                slotProps.value.label
              }}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{
                slotProps.value
              }}</span>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
        </PrimeSelect>
      </div>

      <div class="field">
        <label class="mb-3">Category</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <PrimeRadio id="category1" name="category" value="Accessories"
              v-model="product.category" />
            <label for="category1">Accessories</label>
          </div>
          <div class="field-radiobutton col-6">
            <PrimeRadio id="category2" name="category" value="Clothing"
              v-model="product.category" />
            <label for="category2">Clothing</label>
          </div>
          <div class="field-radiobutton col-6">
            <PrimeRadio id="category3" name="category" value="Electronics"
              v-model="product.category" />
            <label for="category3">Electronics</label>
          </div>
          <div class="field-radiobutton col-6">
            <PrimeRadio id="category4" name="category" value="Fitness" v-model="product.category" />
            <label for="category4">Fitness</label>
          </div>
        </div>
      </div>

      <div class="formgrid grid">
        <div class="field col">
          <label for="price">Price</label>
          <PrimeNumber id="price" v-model="product.price" mode="currency" currency="USD"
            locale="en-US" />
        </div>
        <div class="field col">
          <label for="quantity">Quantity</label>
          <PrimeNumber id="quantity" v-model="product.quantity" integeronly />
        </div>
      </div>
      <template #footer>
        <PrimeBtn label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
        <PrimeBtn label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
      </template>
    </PrimeModal>

    <PrimeModal v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm"
      :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
      </div>
      <template #footer>
        <PrimeBtn label="No" icon="pi pi-times" class="p-button-text"
          @click="deleteProductDialog = false" />
        <PrimeBtn label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
      </template>
    </PrimeModal>

    <PrimeModal v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm"
      :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product">Are you sure you want to delete the selected products?</span>
      </div>
      <template #footer>
        <PrimeBtn label="No" icon="pi pi-times" class="p-button-text"
          @click="deleteProductsDialog = false" />
        <PrimeBtn label="Yes" icon="pi pi-check" class="p-button-text"
          @click="deleteSelectedProducts" />
      </template>
    </PrimeModal>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { FilterMatchMode } from 'primevue/api';


  const dt = ref();
  const products = ref([
    { "id": "1000", "code": "f230fh0g3", "name": "Bamboo Watch", "description": "Product Description", "image": "bamboo-watch.jpg", "price": 65, "category": "Accessories", "quantity": 24, "inventoryStatus": "INSTOCK", "rating": 5 },
    { "id": "1001", "code": "nvklal433", "name": "Black Watch", "description": "Product Description", "image": "black-watch.jpg", "price": 72, "category": "Accessories", "quantity": 61, "inventoryStatus": "INSTOCK", "rating": 4 },
    { "id": "1002", "code": "zz21cz3c1", "name": "Blue Band", "description": "Product Description", "image": "blue-band.jpg", "price": 79, "category": "Fitness", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 3 },
    { "id": "1003", "code": "244wgerg2", "name": "Blue T-Shirt", "description": "Product Description", "image": "blue-t-shirt.jpg", "price": 29, "category": "Clothing", "quantity": 25, "inventoryStatus": "INSTOCK", "rating": 5 },
    { "id": "1004", "code": "h456wer53", "name": "Bracelet", "description": "Product Description", "image": "bracelet.jpg", "price": 15, "category": "Accessories", "quantity": 73, "inventoryStatus": "INSTOCK", "rating": 4 },
    { "id": "1005", "code": "av2231fwg", "name": "Brown Purse", "description": "Product Description", "image": "brown-purse.jpg", "price": 120, "category": "Accessories", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 4 },
    { "id": "1006", "code": "bib36pfvm", "name": "Chakra Bracelet", "description": "Product Description", "image": "chakra-bracelet.jpg", "price": 32, "category": "Accessories", "quantity": 5, "inventoryStatus": "LOWSTOCK", "rating": 3 },
    { "id": "1007", "code": "mbvjkgip5", "name": "Galaxy Earrings", "description": "Product Description", "image": "galaxy-earrings.jpg", "price": 34, "category": "Accessories", "quantity": 23, "inventoryStatus": "INSTOCK", "rating": 5 },
    { "id": "1008", "code": "vbb124btr", "name": "Game Controller", "description": "Product Description", "image": "game-controller.jpg", "price": 99, "category": "Electronics", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 4 },
    { "id": "1009", "code": "cm230f032", "name": "Gaming Set", "description": "Product Description", "image": "gaming-set.jpg", "price": 299, "category": "Electronics", "quantity": 63, "inventoryStatus": "INSTOCK", "rating": 3 },
    { "id": "1010", "code": "plb34234v", "name": "Gold Phone Case", "description": "Product Description", "image": "gold-phone-case.jpg", "price": 24, "category": "Accessories", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 4 },
    { "id": "1011", "code": "4920nnc2d", "name": "Green Earbuds", "description": "Product Description", "image": "green-earbuds.jpg", "price": 89, "category": "Electronics", "quantity": 23, "inventoryStatus": "INSTOCK", "rating": 4 },
    { "id": "1012", "code": "250vm23cc", "name": "Green T-Shirt", "description": "Product Description", "image": "green-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 74, "inventoryStatus": "INSTOCK", "rating": 5 },
    { "id": "1013", "code": "fldsmn31b", "name": "Grey T-Shirt", "description": "Product Description", "image": "grey-t-shirt.jpg", "price": 48, "category": "Clothing", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 3 },
    { "id": "1014", "code": "waas1x2as", "name": "Headphones", "description": "Product Description", "image": "headphones.jpg", "price": 175, "category": "Electronics", "quantity": 8, "inventoryStatus": "LOWSTOCK", "rating": 5 },
    { "id": "1015", "code": "vb34btbg5", "name": "Light Green T-Shirt", "description": "Product Description", "image": "light-green-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 34, "inventoryStatus": "INSTOCK", "rating": 4 },
    { "id": "1016", "code": "k8l6j58jl", "name": "Lime Band", "description": "Product Description", "image": "lime-band.jpg", "price": 79, "category": "Fitness", "quantity": 12, "inventoryStatus": "INSTOCK", "rating": 3 },
    { "id": "1017", "code": "v435nn85n", "name": "Mini Speakers", "description": "Product Description", "image": "mini-speakers.jpg", "price": 85, "category": "Clothing", "quantity": 42, "inventoryStatus": "INSTOCK", "rating": 4 },
    { "id": "1018", "code": "09zx9c0zc", "name": "Painted Phone Case", "description": "Product Description", "image": "painted-phone-case.jpg", "price": 56, "category": "Accessories", "quantity": 41, "inventoryStatus": "INSTOCK", "rating": 5 },
    { "id": "1019", "code": "mnb5mb2m5", "name": "Pink Band", "description": "Product Description", "image": "pink-band.jpg", "price": 79, "category": "Fitness", "quantity": 63, "inventoryStatus": "INSTOCK", "rating": 4 },
    { "id": "1020", "code": "r23fwf2w3", "name": "Pink Purse", "description": "Product Description", "image": "pink-purse.jpg", "price": 110, "category": "Accessories", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 4 },
    { "id": "1021", "code": "pxpzczo23", "name": "Purple Band", "description": "Product Description", "image": "purple-band.jpg", "price": 79, "category": "Fitness", "quantity": 6, "inventoryStatus": "LOWSTOCK", "rating": 3 },
    { "id": "1022", "code": "2c42cb5cb", "name": "Purple Gemstone Necklace", "description": "Product Description", "image": "purple-gemstone-necklace.jpg", "price": 45, "category": "Accessories", "quantity": 62, "inventoryStatus": "INSTOCK", "rating": 4 },
    { "id": "1023", "code": "5k43kkk23", "name": "Purple T-Shirt", "description": "Product Description", "image": "purple-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 5 },
    { "id": "1024", "code": "lm2tny2k4", "name": "Shoes", "description": "Product Description", "image": "shoes.jpg", "price": 64, "category": "Clothing", "quantity": 0, "inventoryStatus": "INSTOCK", "rating": 4 },
    { "id": "1025", "code": "nbm5mv45n", "name": "Sneakers", "description": "Product Description", "image": "sneakers.jpg", "price": 78, "category": "Clothing", "quantity": 52, "inventoryStatus": "INSTOCK", "rating": 4 },
    { "id": "1026", "code": "zx23zc42c", "name": "Teal T-Shirt", "description": "Product Description", "image": "teal-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 3, "inventoryStatus": "LOWSTOCK", "rating": 3 },
    { "id": "1027", "code": "acvx872gc", "name": "Yellow Earbuds", "description": "Product Description", "image": "yellow-earbuds.jpg", "price": 89, "category": "Electronics", "quantity": 35, "inventoryStatus": "INSTOCK", "rating": 3 },
    { "id": "1028", "code": "tx125ck42", "name": "Yoga Mat", "description": "Product Description", "image": "yoga-mat.jpg", "price": 20, "category": "Fitness", "quantity": 15, "inventoryStatus": "INSTOCK", "rating": 5 },
    { "id": "1029", "code": "gwuby345v", "name": "Yoga Set", "description": "Product Description", "image": "yoga-set.jpg", "price": 20, "category": "Fitness", "quantity": 25, "inventoryStatus": "INSTOCK", "rating": 8 }
  ]);
  const productDialog = ref(false);
  const deleteProductDialog = ref(false);
  const deleteProductsDialog = ref(false);
  const product = ref({});
  const selectedProducts = ref();
  const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const submitted = ref(false);
  const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
  ]);

  const formatCurrency = (value) => {
    if (value)
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
  };
  const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
  };
  const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
  };
  const saveProduct = () => {
    submitted.value = true;

    if (product.value.name.trim()) {
      if (product.value.id) {
        product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
        products.value[ findIndexById(product.value.id) ] = product.value;
      }
      else {
        product.value.id = createId();
        product.value.code = createId();
        product.value.image = 'product-placeholder.svg';
        product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
        products.value.push(product.value);
      }

      productDialog.value = false;
      product.value = {};
    }
  };

  const editProduct = (prod) => {
    product.value = { ...prod };
    productDialog.value = true;
  };

  const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
  };

  const deleteProduct = () => {
    products.value = products.value.filter(val => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
      if (products.value[ i ].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  const exportCSV = () => {
    dt.value.exportCSV();
  };

  const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
  };

  const deleteSelectedProducts = () => {
    products.value = products.value.filter(val => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
  };


</script>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
}

.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
