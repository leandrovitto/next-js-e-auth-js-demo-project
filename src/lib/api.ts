import { getSession } from "next-auth/react";

const API_URL = "http://localhost:3002"; // In production, use an environment variable

export async function fetchWithAuth(
	endpoint: string,
	options = {
		headers: {},
	},
) {
	const session = await getSession();

	console.log(session);

	if (!session?.user.accessToken) {
		throw new Error("Not authenticated");
	}

	const headers = {
		"Content-Type": "application/json",
		...options.headers,
		Authorization: `Bearer ${session.user.accessToken}`,
	};

	const response = await fetch(`${API_URL}${endpoint}`, {
		...options,
		headers,
	});

	if (!response.ok) {
		throw new Error(`API error: ${response.statusText}`);
	}

	return response.json();
}
