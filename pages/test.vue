<template>
  <div>
    <CrudTable />
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: 'auth'
  })
</script>
