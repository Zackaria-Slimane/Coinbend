<template>
	<div class="h-full min-h-full" id="landing">
		<div class="overflow-hidden">
			<HeaderSection />
			<main>
				<HeroSection />

				<ClientOnly>
					<LazyFeaturesSection v-if="showcase" />
					<LazyBlogSection v-if="showcase" />
				</ClientOnly>

			</main>
			<FooterSection class="h-fit min-h-full" />
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	const showcase = ref(false)

	definePageMeta({
		middleware: [ 'auth' ]
	})
</script>

<style>
#landing {
	padding: 0;
	margin: 0;
	background-color: #ace0f9;
	background-image: linear-gradient(135deg,
			#fff1eb 0%,
			#ace0f9 40%,
			#9bbbfc 60%,
			#e6f0ff 100%);
	background: -webkit-linear-gradient(135deg,
			#fff1eb 0%,
			#ace0f9 40%,
			#9bbbfc 60%,
			#e6f0ff 100%);
	background-size: 200% 200%;
	animation: shine 8s infinite alternate;
}

.page-enter-active,
.page-leave-active {
	transition: all 0.5s;
}

.page-enter-from,
.page-leave-to {
	opacity: 0.3;
	filter: blur(1rem);
}
</style>
