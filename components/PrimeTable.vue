<template>
  <div class="mt-24 px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Budget</h1>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none gap-2">
        <button type="button"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto">Add
          Budget target</button>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full">
              <thead class="bg-white">
                <tr>
                  <th scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Name</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <template v-for="location in locations" :key="location.name">
                  <tr class="border-t border-gray-200">
                    <th colspan="5" scope="colgroup"
                      class="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6">
                      {{ location.name }}</th>
                  </tr>
                  <tr v-for="(person, personIdx) in location.people" :key="person.email"
                    :class="[personIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t']">
                    <td class="whitespace-nowrap text-sm font-medium text-gray-900 sm:pl-6">
                      {{ person.name }} <br />
                      <PrimeBar class="p-progressbar" :value="progress" style="height: .7em"
                        :showValue="false" />
                    </td>

                    <td
                      class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <a href="#" class="text-sky-600 hover:text-sky-900">Edit<span
                          class="sr-only">, {{ person.name }}</span></a>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  let progress = ref(0)

  onMounted(() => {
    setInterval(() => {
      if (progress.value < 100) {
        let val = 10
        progress.value += val
      }
    }, 1000)
  })

  const locations = [
    {
      name: 'Montly',
      people: [
        { name: 'Rent', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'Water / elec', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'Internet', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
      ],
    },
    {
      name: 'Frequents',
      people: [
        { name: 'Beers', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'Date night', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
        { name: 'Movies', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
        { name: 'Games', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
      ],
    },
    {
      name: 'savings',
      people: [
        { name: 'House', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'Car', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
        { name: 'Retirement', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
      ],
    },
    // More people...
  ]
</script>

<style scoped>
.p-progressbar .p-progressbar-value {
  border: 0 none;
  margin: 0;
  background: skyblue !important
}
</style>
