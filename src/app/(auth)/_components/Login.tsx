"use client";
import Logo from "@/app/_components/layout/Logo";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import SignInForm from "./EmailLogin";
import SocialLogin from "./SocialLogin";
import { Routes } from "@/app/routes";

const ErrorAlert = ({ error }: { error: string }) => {
	return (
		<Alert variant={"destructive"}>
			<div className="flex items-center">
				<div className="flex-shrink-0">
					<CircleAlert size={24} />
				</div>
				<div className="ml-3">
					<p className="text-sm text-red-500">
						{(() => {
							switch (error) {
								case "OAuthAccountNotLinked":
									return "Please link your account to continue";
								default:
									return "An error occurred, please try again";
							}
						})()}
					</p>
				</div>
			</div>
		</Alert>
	);
};

const Login = () => {
	const searchParams = useSearchParams();
	const errorParam = searchParams.get("error");

	const [loading, setLoading] = useState<boolean>(false);

	return (
		<div className={cn("flex flex-col gap-6")}>
			<Card className="overflow-hidden">
				<CardContent className="grid p-0 md:grid-cols-2">
					<div className="p-24 md:px-12 py-32">
						<div className="flex flex-col gap-6">
							<div className="flex flex-col items-center text-center">
								<Logo />
								<p className="text-xs text-left">
									<b>Welcome back</b>
								</p>
								<p className="text-xs text-left text-muted-foreground">
									Login to your Acme Inc account, to access the private page you
									have to be authenticated
								</p>
							</div>

							{errorParam && <ErrorAlert error={errorParam} />}

							<SignInForm loading={loading} handleLoading={setLoading} />

							<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
								<span className="relative z-10 bg-background px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>
							<SocialLogin loading={loading} handleLoading={setLoading} />
							<div className="text-center text-sm">
								Don&apos;t have an account?{" "}
								<a href={Routes.LOGIN} className="underline underline-offset-4">
									Sign up
								</a>
							</div>
						</div>
					</div>
					<div className="relative hidden bg-muted md:block">
						<Image
							src="https://images.unsplash.com/photo-1651573090348-4ccf3924ef82?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxvZ2lufGVufDB8fDB8fHww"
							alt="Login background"
							width={800}
							height={1200}
							className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</div>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
				By clicking continue, you agree to our{" "}
				<a href="/terms-of-service">Terms of Service</a> and{" "}
				<a href="/privacy-policy">Privacy Policy</a>.
			</div>
		</div>
	);
};

export default Login;
