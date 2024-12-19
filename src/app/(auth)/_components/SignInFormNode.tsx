"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { fetchWithAuth } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { useState } from "react";

const SignInFormNode: React.FC = () => {
	const { data: session, status } = useSession();
	const [username, setUsername] = useState("user");
	const [password, setPassword] = useState("password");
	const [error, setError] = useState<string | null>(null);
	const [userProfile, setUserProfile] = useState<any>(null);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const result = await signIn("credentials", {
			username,
			password,
			redirect: false,
		});

		console.log(result);

		if (result?.error) {
			setError(result.error);
		}
	};

	const handleLogout = () => {
		signOut();
	};

	const fetchUserProfile = async () => {
		try {
			const data = await fetchWithAuth("/api/user-profile");
			console.log(data);
			setUserProfile(data);
		} catch (err) {
			setError("Failed to fetch user profile");
		}
	};

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Alert className="mb-4 text-xs" variant={"destructive"}>
				<div>NextAuth.js Integration API Debug</div>
				<pre>{JSON.stringify(status, undefined, 2)}</pre>
				<pre>{JSON.stringify(session, undefined, 2)}</pre>
			</Alert>
			{!session ? (
				<form onSubmit={handleLogin} className="flex flex-col gap-y-4">
					<div className="flex flex-col gap-y-2">
						<Label>Email</Label>
						<Input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Username"
							required
						/>
					</div>
					<div className="flex flex-col gap-y-2">
						<Label>Password</Label>
						<Input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							required
						/>
					</div>
					<Button className="mt-4 w-full" type="submit">
						Log in
					</Button>
					{error && <Alert variant="destructive">{error}</Alert>}
				</form>
			) : (
				<Alert className="mb-4 text-xs flex flex-col gap-y-2">
					<p>Welcome, {session.user?.name}!</p>
					<p className=" truncate">
						Your access token: {session.user?.accessToken}
					</p>
					<Button onClick={fetchUserProfile} variant={"outline"}>
						Fetch User Profile
					</Button>
					<Button onClick={handleLogout}>Log out</Button>
					{userProfile && (
						<div>
							<h3>User Profile:</h3>
							<pre>{JSON.stringify(userProfile, null, 2)}</pre>
						</div>
					)}
				</Alert>
			)}
		</div>
	);
};

export default SignInFormNode;
