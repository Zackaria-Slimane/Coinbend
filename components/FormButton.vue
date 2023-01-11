<template>
  <button
    class="flex w-2/3 justify-center rounded-md border border-transparent bg-blue-400 py-1 px-2 text-md font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
    {{ label }}
  </button>
</template>

<script setup>
  const props = defineProps({
    label: String
  })
</script>
