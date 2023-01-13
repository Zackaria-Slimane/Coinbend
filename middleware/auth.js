export default defineNuxtRouteMiddleware((to) => {
	const client = useSupabaseClient();
	const user = useSupabaseUser();

	if (!user.value && to.path === "/dashboard") {
		navigateTo("/");
	}
	if (!user.value && to.path === "/test") {
		navigateTo("/");
	}
	if (!user.value && to.path === "/account") {
		navigateTo("/");
	}
	if (user.value && to.path === "/") {
		navigateTo("/dashboard");
	}

	client.auth.onAuthStateChange((event, session) => {
		if (event === "SIGNED_OUT" || event === "USER_DELETED") {
			// delete cookies on sign out
			const expires = new Date(0).toUTCString();
			//document.cookie = `sb-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
			document.cookie = `sb-access-token=; path=/; SameSite=Lax; secure`;
			document.cookie = `sb-refresh-token=; path=/; SameSite=Lax; secure`;
			useCookie("sb-access-token");
			useCookie("sb-refresh-token");
		}
		if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
			const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
			//document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
			document.cookie = `sb-access-token=${session.access_token}; path=/;  SameSite=Lax; secure`;
			document.cookie = `sb-refresh-token=${session.refresh_token}; path=/; SameSite=Lax; secure`;
			useCookie("sb-access-token", session.access_token);
			useCookie("sb-refresh-token", session.refresh_token);
		}
	});
});
