<template>
  <div class="container w-1/2 mx-auto">
    <button
      class="inline-flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
      @click="openBasic">Budget Settings </button>
    <PrimeModal header="Budget Settings" v-model:visible="displayBasic"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '40vw' }">
      <div class="mx-8 mt-10">
        <div class="md:grid md:grid-cols-1 md:gap-6">
          <div class="mt-5 md:col-span-2 md:mt-0">

            <div class="overflow-hidden  sm:rounded-md">
              <div class="bg-white px-4 py-5 sm:p-6">
                <div class="grid grid-cols-3 gap-6">
                  <div class="col-span-3">
                    <label for="budget-name" class="block text-sm font-medium text-gray-700">Budget
                      Name</label>
                    <input type="text" v-model="budgetName" name="budget-name" id="budget-name"
                      autocomplete="name"
                      class="mt-1 block w-full rounded-md border-sky-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                  </div>


                  <div class="col-span-3">
                    <label for="currency"
                      class="block text-sm font-medium text-gray-700">Currency</label>
                    <select id="currency" name="currency" autocomplete="currency-name"
                      v-model="selectedCurrency"
                      class="mt-1 block w-full rounded-md border border-sky-300 bg-white py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm">
                      <option v-for="currency in currencies" :value="currency.value"
                        :key="currency.value">{{ currency.name }}
                      </option>
                    </select>
                  </div>

                  <div class="col-span-3">
                    <label for="currency-placement"
                      class="block text-sm font-medium text-gray-700">Currency
                      placement</label>
                    <select id="currency-placement" name="currency-placement"
                      v-model="selectedFormat"
                      class="mt-1 block w-full rounded-md border border-sky-300 bg-white py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm">
                      <option v-for="format in formats" :key="format.value" :value="format.value">{{
                        format.name
                      }}</option>

                    </select>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <template #footer>
        <PrimeBtn label="Cancel" icon="pi pi-times" @click="closeBasic"
          class="p-button-text p-button-danger p-button-sm" />
        <PrimeBtn label="Save" class="p-button-sm p-button-raised  p-button-info" icon=" pi
          pi-check" @click="closeBasic" autofocus />
      </template>
    </PrimeModal>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  const displayBasic = ref(false);

  const openBasic = () => {
    displayBasic.value = true;
  };
  const closeBasic = () => {
    displayBasic.value = false;
  };

  const budgetName = ref(null)
  const selectedCurrency = ref(null)
  const selectedFormat = ref(null)
  const currencies = [ { name: 'US DOLLARS', value: 'USD' }, { name: 'CANADIAN DOLLARS', value: 'CAD' }, { name: 'MORROCCAN DIRHAM', value: 'MAD' } ]
  const formats = [ { name: 'Prefix', value: 'before' }, { name: 'Suffix', value: 'after' }, { name: 'Without', value: 'none' } ]
</script>
