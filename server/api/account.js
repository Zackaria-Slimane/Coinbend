export default defineEventHandler(async (event) => {
	const refreshToken = useCookie["sb-refresh-token"];
	const accessToken = useCookie["sb-access-token"];

	if (refreshToken && accessToken) {
		await supabase.auth.setSession({
			refresh_token: refreshToken,
			access_token: accessToken,
		});
	} else {
		// make sure you handle this case!
		throw new Error("User is not authenticated.");
	}

	// returns user information
	await supabase.auth.getUser();
});
