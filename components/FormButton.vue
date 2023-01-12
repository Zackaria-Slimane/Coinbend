<template>
  <PrimeBtn class="p-button-sm p-button-outlined p-button-info p-button-raised w-full"
    icon="pi pi-sign-in" :loading="loading" :label="label" />
</template>

<script setup>
  const props = defineProps({
    label: String,
    loading: Boolean,
  })
</script>
