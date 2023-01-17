<template>
	<div class="flex h-screen">
		<TransitionRoot as="template" :show="sidebarOpen">
			<Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
				<TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
					enter-from="opacity-0" enter-to="opacity-100"
					leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
					leave-to="opacity-0">
					<div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
				</TransitionChild>

				<div class="fixed inset-0 z-40 flex">
					<TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
						enter-from="-translate-x-full" enter-to="translate-x-0"
						leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
						leave-to="-translate-x-full">
						<DialogPanel
							class="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
							<TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
								enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
								leave-to="opacity-0">
								<div class="absolute top-0 right-0 -mr-12 pt-2">
									<button type="button"
										class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
										@click="sidebarOpen = false">
										<span class="sr-only">Close sidebar</span>
										<XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
									</button>
								</div>
							</TransitionChild>
							<!--  sidebar for mobiles -->
							<div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
								<div class="flex flex-shrink-0 items-center px-4">
									<img class="h-14 w-auto" src="/coinbend-logo.png" alt="Coinbend" />
								</div>
								<nav aria-label="Sidebar" class="mt-5">
									<template v-for="item in navigation" :key="item.name">
										<div v-if="!item.children">
											<a href="#"
												:class="[item.current ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md']">
												<component :is="item.icon"
													:class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-6 w-6']"
													aria-hidden="true" />
												{{ item.name }}
											</a>
										</div>
										<Disclosure as="div" v-else class="space-y-1" v-slot="{ open }">
											<DisclosureButton
												:class="[item.current ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500']">
												<component :is="item.icon"
													class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
													aria-hidden="true" />
												<span class="flex-1">{{ item.name }}</span>
												<svg
													:class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400']"
													viewBox="0 0 20 20" aria-hidden="true">
													<path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
												</svg>
											</DisclosureButton>
											<DisclosurePanel class="space-y-1">
												<DisclosureButton v-for="subItem in item.children" :key="subItem.name"
													as="a" :href="subItem.href"
													class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
													{{ subItem.name }}</DisclosureButton>
											</DisclosurePanel>
										</Disclosure>
									</template>
								</nav>
							</div>
							<div class="flex flex-shrink-0 border-t border-gray-200 p-4">
								<a href="#" class="group block flex-shrink-0">
									<div class="flex items-center">
										<div>
											<img v-if="user.user_metadata.picture"
												class="inline-block h-10 w-10 rounded-full"
												:src="user.user_metadata.picture" alt=" user profile picture" />
											<img v-else class="inline-block h-10 w-10 rounded-full"
												src="@/assets/images/blank.png" alt=" user profile picture" />
										</div>
										<div class="ml-3">
											<p v-if="user.user_metadata.name"
												class="text-base font-medium text-gray-700 group-hover:text-gray-900">
												{{ user.user_metadata.name }}</p>
											<p v-else
												class="text-base font-medium text-gray-700 group-hover:text-gray-900">
												{{ user.email }}</p>
											<NuxtLink to="/account"
												class="text-sm font-medium text-sky-500 hover:text-gray-700">View
												profile</NuxtLink>
											<div>
												<button @click="signOut()"
													class="text-sm font-medium text-sky-500 hover:text-gray-700"> Log
													out
												</button>
											</div>
										</div>
									</div>
								</a>
							</div>
							<!--  sidebar for mobiles -->
						</DialogPanel>
					</TransitionChild>
					<div class="w-14 flex-shrink-0" aria-hidden="true">
						<!-- Force sidebar to shrink to fit close icon -->
					</div>
				</div>
			</Dialog>
		</TransitionRoot>

		<!--  sidebar for desktop -->
		<div class="hidden lg:flex lg:flex-shrink-0">
			<div class="flex w-64 flex-col">
				<!-- Sidebar component, swap this element with another sidebar if you like -->
				<div
					class="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 pb-4">
					<div class="flex flex-shrink-0 items-center px-4">
						<img class="h-14 w-auto" src="/coinbend-logo.png" alt="Coinbend logo" />
					</div>
					<div class="mt-5 flex flex-grow flex-col">
						<nav class="flex-1 space-y-1 bg-white px-2" aria-label="Sidebar">
							<template v-for="item in navigation" :key="item.name">
								<div v-if="!item.children">
									<a href="#"
										:class="[item.current ? 'bg-sky-100 text-gray-900' : 'bg-white text-gray-600 hover:bg-sky-50 hover:text-gray-900', 'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md']">
										<component :is="item.icon"
											:class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-sky-500', 'mr-3 flex-shrink-0 h-6 w-6']"
											aria-hidden="true" />
										{{ item.name }}
									</a>
								</div>
								<Disclosure as="div" v-else class="space-y-1" v-slot="{ open }">
									<DisclosureButton
										:class="[item.current ? 'bg-sky-100 text-gray-900' : 'bg-white text-gray-600 hover:bg-sky-50 hover:text-gray-900', 'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500']">
										<component :is="item.icon"
											class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-sky-500"
											aria-hidden="true" />
										<span class="flex-1">{{ item.name }}</span>
										<svg
											:class="[open ? 'text-sky-400 rotate-90' : 'text-gray-300', 'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400']"
											viewBox="0 0 20 20" aria-hidden="true">
											<path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
										</svg>
									</DisclosureButton>
									<DisclosurePanel class="space-y-1">
										<DisclosureButton v-for="subItem in item.children" :key="subItem.name" as="a"
											:href="subItem.href"
											class="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-sky-50 hover:text-gray-900">
											{{ subItem.name }}</DisclosureButton>
									</DisclosurePanel>
								</Disclosure>
							</template>
						</nav>
					</div>
					<div class="flex flex-shrink-0 border-t border-gray-200 p-4">
						<a href="#" class="group block flex-shrink-0">
							<div class="flex items-center">
								<div>
									<img v-if="user.user_metadata.picture" class="inline-block h-10 w-10 rounded-full"
										:src="user.user_metadata.picture" alt=" user profile picture" />
									<img v-else class="inline-block h-10 w-10 rounded-full"
										src="@/assets/images/blank.png" alt=" user profile picture" />
								</div>
								<div class="ml-3">
									<p v-if="user.user_metadata.name"
										class="text-base font-medium text-gray-700 group-hover:text-gray-900">
										{{ user.user_metadata.name }}</p>
									<p v-else class="text-base font-medium text-gray-700 group-hover:text-gray-900">
										{{ user.email }}</p>
									<NuxtLink to="/account"
										class="text-sm font-medium text-sky-500 hover:text-gray-700">View
										profile</NuxtLink>
									<div>
										<button @click="signOut()"
											class="text-sm font-medium text-sky-500 hover:text-gray-700"> Log
											out
										</button>
									</div>
								</div>
							</div>
						</a>
					</div>
				</div>
				<!-- Sidebar component, swap this element with another sidebar if you like -->
			</div>
		</div>
		<!-- sidebar for desktop -->

		<div class="flex min-w-0 flex-1 flex-col overflow-hidden">
			<!-- logo closed on mobile  -->
			<div class="lg:hidden">
				<div
					class="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
					<div>
						<img class="h-14 w-auto" src="/coinbend-logo.png" alt="Coinbend logo" />
					</div>
					<div>
						<!-- closed header menu on mobile-->
						<button type="button"
							class="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
							@click="sidebarOpen = true">
							<span class="sr-only">Open sidebar</span>
							<Bars3Icon class="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
			<!-- logo closed on mobile  -->

			<!-- main content  -->
			<div class=" flex flex-1 overflow-y-scroll">
				<main class="z-0 flex-1 overflow-y-auto focus:outline-none">
					<!-- Start main area-->
					<div class=" py-6 px-4 sm:px-6 lg:px-8">
						<div class="h-full rounded-lg border-2 border-solid border-gray-200">
							<h1 class="text-center text-sky-500 mt-8 text-xl">Logged in as : {{ userName }}</h1>
							<div class="text-center">
								<HeadlessModal />
							</div>
							<ReorderRow class="my-12" />
						</div>

					</div>
					<!-- End main area -->
				</main>
				<aside
					class="relative hidden w-80 flex-shrink-0 overflow-y-auto border-l border-gray-200 xl:flex xl:flex-col">
					<!-- Start secondary column (hidden on smaller screens) -->
					<div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
						<div class="h-full rounded-lg border-2 border-solid border-gray-200" />
					</div>
					<!-- End secondary column -->
				</aside>
			</div>
			<!-- main content -->
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { Dialog, DialogPanel, TransitionChild, TransitionRoot, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
	import { ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, XMarkIcon, Bars3Icon } from '@heroicons/vue/24/outline/index.js'


	definePageMeta({
		middleware: 'auth'
	})

	const supaAuth = useSupabaseAuthClient()
	const user = useSupabaseUser()
	const { $showToast } = useNuxtApp();

	function siteAlert () {
		setTimeout(() => {
			$showToast(`Under construction, please bear with us`, "warning", 10000);
		}, 3500)
	}



	const signOut = async () => {
		const { error } = await supaAuth.auth.signOut();
		setTimeout(() => {
			if (!error) {
				navigateTo('/')
				$showToast(`Safekeeping your money until next time !`, "info", 3500);
			}
		}, 1000);
	}


	const userName = user?.value?.email
	const navigation = [
		{ name: 'Dashboard', icon: HomeIcon, current: true, href: '#' },
		{
			name: 'Budget',
			icon: FolderIcon,
			current: false,
		},
		{
			name: 'Accounts',
			icon: InboxIcon,
			current: false,
			children: []
		},
		{
			name: 'Reports',
			icon: ChartBarIcon,
			current: false,
			children: [
				{ name: 'Overview', href: '#' },
				{ name: 'Settings', href: '#' },
			],
		},
	]

	const sidebarOpen = ref(false)
	siteAlert()

</script>

<style scoped>
html {
	height: 100% !important;
}

body {
	overflow: hidden;
	height: 100% !important;
}
</style>
