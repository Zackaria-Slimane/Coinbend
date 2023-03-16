<template>
 <PrimeTimeLine :value="expenses" align="alternate" class="w-full md:w-20rem">
    <template #content="slotProps">
        {{ slotProps.item}}
    </template>
</PrimeTimeLine>
</template>

<script setup>
defineProps(['expenses'])
</script>
