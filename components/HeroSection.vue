<template>
	<div class="h-full min-h-screen">

		<div class="overflow-hidden">
			<div class="hidden sm:block -z-50" aria-hidden="true">
				<svg
					class="absolute bottom-0 right-0 mb-40 translate-x-1/2 transform text-gray-700 lg:mt-28 lg:mb-0 xl:translate-x-0 xl:transform-none"
					width="244" height="268" viewBox="0 0 364 384" fill="none">
					<defs>
						<pattern id="eab71dd9-9d7a-47bd-8044-256344ee00d0" x="0" y="0" width="20" height="20"
							patternUnits="userSpaceOnUse">
							<rect x="0" y="0" width="4" height="4" fill="currentColor" />
						</pattern>
					</defs>
					<rect width="364" height="384" fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)" />
				</svg>
				<img
					class="blob absolute bottom-0 right-0 mb-48 translate-x-1/2 transform text-gray-700 lg:top-0 lg:mt-28 lg:mb-0 xl:translate-x-0 xl:transform-none"
					width="484" height="486" :src="sliderBg" alt="savings illustrations" />
				<img
					class="blobalt absolute bottom-0 left-0 mb-48 translate-x-1/2 transform text-gray-700 lg:mt-28 lg:mb-0 xl:translate-x-0 xl:transform-none"
					width="364" height="384" src="/creditcard.svg" alt="creditcard logo" />
			</div>
			<div class="pt-2 pb-16 sm:pb-24">
				<main class="mt-10">
					<div class="mx-auto max-w-7xl">
						<div class="lg:grid lg:grid-cols-12 lg:gap-8 z-50">
							<!-- hero start-->
							<div
								class="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
								<div>
									<h2 id="hero-text"
										class="font-title p-2 text-justify font-bold text-transparent text-4xl md:text-6xl sm:text-8xl bg-clip-text bg-gradient-to-r from-sky-600 via-rose-400 to-yellow-500">
										Get a hold of your spendings.
									</h2>
									<p class="mt-8 text-lg leading-8 text-gray-600 sm:text-justify">
										Start budgeting and get ahead of your finnances, plan and allocate
										every penny!.
										<span class="text-sky-700" aria-hidden="true">&rarr;</span>
									</p>
								</div>
							</div>
							<!-- hero end-->

							<!-- form start-->

							<div class="mt-16 sm:mt-48 lg:col-span-6 lg:mt-0">
								<div style="backdrop-filter: blur(5px)"
									class="bg-white py-8 px-4 shadow-xl sm:px-10 bg-opacity-30 bg-clip-padding sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden rounded-lg">
									<div class="px-4 py-8 sm:px-10">
										<div>
											<p
												class="font-title mt-2 mb-6 text-center text-xl font-bold tracking-tight bg-clip-text bg-gradient-to-r from-sky-600 via-rose-400 to-yellow-500 text-transparent">
												Happy budgeting !
											</p>

											<div class="mt-6 space-y-6" id="form">
												<div>
													<label for="email" class="sr-only">
														Email</label>
													<input type="email" name="email" id="email" autocomplete="email"
														placeholder="Email" v-model="userMail"
														class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
												</div>

												<div>
													<label for="password" class="sr-only">Password</label>
													<input id="password" name="password" type="password"
														placeholder="Password" autocomplete="current-password"
														v-model="userPass" @keypress.enter.prevent="login()"
														class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 !sm:text-sm" />
												</div>

												<div class="flex items-center justify-between my-6">
													<div class="text-sm">
														<button class="font-medium text-sky-700 hover:text-blue-500">
															Forgot your password?
														</button>
													</div>
												</div>

												<div class="flex justify-around !mt-12">
													<PrimeBtn class="p-button-sm p-button-raised p-button-info w-full"
														icon="pi pi-sign-in" :loading="loading" v-if="!isSignUp" label="Log in"
														@click="login()" />

													<PrimeBtn
														class="p-button-sm p-button-outlined p-button-info p-button-raised w-full"
														icon="pi pi-sign-in" :loading="loading" v-if="isSignUp" label="Sign up"
														@click="signUp()" />
												</div>
												<div class="flex justify-around !mt-12 text-sky-700">
													<button @click="isSignUp = !isSignUp">
														{{
															isSignUp
															? "Already have an account? Log In"
																: "Don't have an account yet? Sign Up"
														}}
													</button>
												</div>
											</div>
										</div>

										<div class="relative sm:mt-12 mt-4">
											<div class="absolute inset-0 flex items-center" aria-hidden="true">
												<div class="w-full border-t border-sky-300" />
											</div>
											<div class="relative flex justify-center text-sm">
												<span class="bg-white rounded-lg px-2 text-sky-500">Or</span>
											</div>
										</div>
										<div class="mt-2 grid grid-cols-3 gap-3">
											<div>
												<a href="#" @click="signProvider('google')"
													class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
													<span class="sr-only">Sign in with Google</span>
													<img src="@/assets/images/google.svg" width="16" height="16"
														alt="google logo" />
												</a>
											</div>
											<div>
												<a href="#" @click="signProvider('github')"
													class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
													<span class="sr-only">Sign in with GitHub</span>
													<img src="@/assets/images/github.svg" width="16" height="16"
														alt="github logo" />
												</a>
											</div>
											<div>
												<a href="#" @click="signProvider('twitter')"
													class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
													<span class="sr-only">Sign in with Twitter</span>
													<img src="@/assets/images/twitter.svg" width="16" height="16"
														alt="twitter logo" />
												</a>
											</div>
										</div>
									</div>
									<div class="border-t-2 border-gray-200 bg-gray-50 px-4 py-6 sm:px-10 hidden">
										<p class="text-xs leading-5 text-gray-500">
											By signing up, you agree to our
											<a href="#" class="font-medium text-gray-900 hover:underline">Terms</a>,
											<a href="#" class="font-medium text-gray-900 hover:underline">Data Policy</a>
											and
											<a href="#" class="font-medium text-gray-900 hover:underline">Cookies
												Policy</a>.
										</p>
									</div>
								</div>
							</div>
							<!-- form end-->
						</div>
					</div>
				</main>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";

	const isSignUp = ref(false);
	const userMail = ref("");
	const userPass = ref("");
	const loading = ref(false);
	const supaAuth = useSupabaseAuthClient();
	const user = useSupabaseUser();
	const { $showToast } = useNuxtApp();

	const signProvider = async (provider) => {
		const { error } = await supaAuth.auth.signInWithOAuth({ provider });
		if (error) {
			$showToast(`${ error.message }`, "error", 5000);
			return;
		}
	};

	const login = async () => {
		loading.value = true;
		const { user, error } = await supaAuth.auth.signInWithPassword({
			email: userMail.value,
			password: userPass.value,
		});
		if (user || error) {
			loading.value = false;
		}
		if (error) {
			$showToast(`${ error.message }`, "error", 3500);
		}
	};

	const signUp = async () => {
		loading.value = true;
		const { user, error } = await supaAuth.auth.signUp({
			email: userMail.value,
			password: userPass.value,
		});
		if (user || error) {
			loading.value = false;
		}
		if (error) {
			$showToast(`${ error.message }`, "error", 3500);
		}
		if (!error) {
			setTimeout(() => {
				loading.value = false;
				$showToast("Confirmation mail sent, pease check your inbox", "info", 5000);
			}, 2000);
		}
	};

	onMounted(() => {
		watchEffect(() => {
			if (user.value) {
				loading.value = false;
				//insert toaster
				$showToast("Logged in successfuly ! ", "success", 3500);
				setTimeout(() => {
					navigateTo("/dashboard");
				}, 1500);
			}
		});
	});

	let sliderBg = ref("/managemoney.svg");
	const images = new Array(
		"/managemoney.svg",
		"/savings.svg",
		"/piggypana.svg",
		"/financeamico.svg",
		"/walletraf.svg",
		"/financebro.svg",
		"/moneyplant.svg",
		"/piggybro.svg",
		"/financerafiki.svg",
		"/walletamico.svg"
	);
	setInterval(() => {
		images.splice(images.length, 0, images[ 0 ]);
		images.splice(0, 1);
		sliderBg.value = images[ 0 ];
	}, 6000);
</script>

<style>
@keyframes shine {
	from {
		background-position: 0 0;
	}

	to {
		background-position: 100% 100%;
	}
}

@keyframes morph {

	0%,
	100% {
		border-radius: 42% 56% 72% 28% / 42% 42% 56% 48%;
	}

	33% {
		border-radius: 72% 28% 48% 48% /28% 28% 72% 72%;
	}

	66% {
		border-radius: 100% 56% 56% 100% /100% 100% 56% 56%;
	}
}

@keyframes slider {
	0% {
		translate: 0 0;
	}

	100% {
		translate: 0 20%;
	}
}

.blob {
	overflow: hidden;

	animation: slider 3s alternate-reverse infinite;
}

.blobalt {
	overflow: hidden;
	border-radius: 42% 56% 72% 28% / 42% 42% 56% 48%;
	animation: morph 4s linear infinite;
}
</style>
