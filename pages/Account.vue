<template>
	<div class="container w-1/2 mx-auto h-screen mt-64">
		<h3 class="text-center  text-sky-700 "> You are logged in successfuly {{ userName }}
			!</h3>
		<h3 class="text-center text-sky-500 "> This page is under construction, please bear
			with us </h3>
		<h1 class="text-center text-sky-500 py-6 text-xl"> Redirect in {{ count }}</h1>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	const user = useSupabaseUser()

	definePageMeta({
		middleware: 'auth'
	})

	const count = ref(5)
	const userName = user?.value?.email


	function countDown () {
		const timer = setInterval(() => {
			count.value -= 1
			if (count.value == 0) {
				clearInterval(timer);
				return navigateTo('/dashboard')
			}
		}, 1000)

	}

	onMounted(() => {
		countDown()
	})
</script>
