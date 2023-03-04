<template>
	<div class="mt-7 max-w-sm mx-auto text-center card">
		<p class="mt-7 text-red-500 text-7xl font-bold">{{ error.statusCode }}</p>
		<p class="mt-7 text-4xl">Sorry something wrong </p>
		<p class="mt-7 text-red-500 font-bold">{{ error.message }}</p>
		<button class=" my-7" @click="handleClearError"> Go back home</button>
	</div>
</template>

<script setup>

	const user = useSupabaseUser();
	let handleClearError

	defineProps([ 'error' ])

	if (user.value) {
		handleClearError = () => clearError({ redirect: '/dashboard' })
	} else {
		handleClearError = () => clearError({ redirect: '/' })
	}

</script>
