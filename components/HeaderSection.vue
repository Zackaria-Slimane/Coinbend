<template>
	<Popover id="nav-section" class="appHeader z-50">
		<nav class="relative mx-auto flex max-w-full items-center justify-between px-6 sm:px-16"
			aria-label="Global">
			<div class="flex flex-1 items-center">
				<div class="flex w-full items-center justify-between md:w-auto">
					<NuxtLink to="/">
						<span class="sr-only">Coinbend</span>
						<img class="p-4" width="200px" height="100px" src="/coinbend-logo.png"
							alt="coinbend logo" />
					</NuxtLink>
					<div class="-mr-2 flex items-center md:hidden">
						<PopoverButton
							class="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white">
							<span class="sr-only">Open main menu</span>
							<Bars3Icon class="h-6 w-6" aria-hidden="true" />
						</PopoverButton>
					</div>
				</div>

			</div>
			<div v-if="user" class="hidden  gap-4 md:flex">
				<NuxtLink to="/account"
					class="inline-block rounded-lg bg-sky-500 px-4 py-0.5 text-sm font-semibold leading-7 text-white shadow-md ring-1 ring-sky-600 hover:bg-sky-700 hover:ring-sky-700">
					My Account</NuxtLink>
				<button @click="signOut"
					class="inline-block rounded-lg bg-sky-500 px-4 py-0.5 text-sm font-semibold leading-7 text-white shadow-md ring-1 ring-sky-600 hover:bg-sky-700 hover:ring-sky-700">
					Sign out
				</button>
			</div>
		</nav>

		<transition enter-active-class="duration-150 ease-out" enter-from-class="opacity-0 scale-95"
			enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in"
			leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
			<PopoverPanel focus
				class="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden">
				<div class="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
					<div class="flex items-center justify-between px-5 pt-4">
						<div>
							<img class="h-16 w-auto" src="/coinbend-logo.png" alt="coinbend logo " />
						</div>
						<div class="-mr-2">
							<PopoverButton
								class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
								<span class="sr-only">Close menu</span>
								<XMarkIcon class="h-6 w-6" aria-hidden="true" />
							</PopoverButton>
						</div>
					</div>
					<NuxtLink to="/account"
						class="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-sky-600 hover:bg-gray-100">
						My account</NuxtLink>
					<button v-if="user" @click="signOut"
						class="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-sky-600 hover:bg-gray-100">
						Sign out
					</button>

				</div>
			</PopoverPanel>
		</transition>
	</Popover>
</template>


<script setup>
	import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
	import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline/index.js'



	const supaAuth = useSupabaseAuthClient()
	const user = useSupabaseUser()



	const signOut = async () => {
		const { error } = await supaAuth.auth.signOut();
		navigateTo('/')
	}

</script>
