import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import { Routes } from "./routes";
import Header from "./_components/layout/Header";

export default function Home() {
	return (
		<div>
			<Header />
			<main className="container flex min-h-screen flex-col items-center justify-center p-4">
				<Card className="w-full max-w-3xl">
					<CardContent className="pt-6">
						<div className="flex flex-col items-center space-y-6 text-center">
							<div className="rounded-full bg-primary p-3">
								<LockKeyhole className="h-6 w-6 text-primary-foreground" />
							</div>
							<div className="space-y-2">
								<p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
									NextAuth.js Integration Example
								</p>
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
									Next Auth Js - Complete Flow
								</h1>
								<p className="text-xl text-muted-foreground">
									Please sign in to access the private page
								</p>
							</div>
							<div className="rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
								(Public Page)
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-center pb-6 pt-4">
						<Button asChild>
							<Link href={Routes.LOGIN}>Sign In</Link>
						</Button>
					</CardFooter>
				</Card>
			</main>
		</div>
	);
}
