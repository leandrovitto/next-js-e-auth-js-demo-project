"use client";

import { Routes } from "@/app/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";
import type { FormEvent } from "react";

const EmailLogin = ({
	loading,
	handleLoading,
}: {
	loading: boolean;
	handleLoading: (value: boolean) => void;
}) => {
	const [email, setEmail] = useState<null | string>("");

	const setLoading = (value: boolean) => {
		handleLoading(value);
	};

	async function handleSignInWithEmail(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		const signInResult = await signIn("email", {
			email: email,
			callbackUrl: `${window.location.origin}${Routes.DASHBOARD}`,
			redirect: false,
		});

		setLoading(false);

		if (!signInResult?.ok) {
			return toast({
				title: "Well this did not work...",
				description: "Something went wrong, please try again",
				variant: "destructive",
			});
		}

		return toast({
			title: "Check your email",
			description: "A magic link has been sent to you",
		});
	}

	return (
		<form onSubmit={handleSignInWithEmail}>
			<div className="flex flex-col gap-y-2">
				<Label>Email</Label>
				<Input
					onChange={(e) => setEmail(e.target.value)}
					value={email as string}
					name="email"
					type="email"
					placeholder="name@example.com"
					required
				/>
			</div>

			<Button type="submit" className="mt-4 w-full" disabled={loading}>
				Login with Email
			</Button>
		</form>
	);
};

export default EmailLogin;
