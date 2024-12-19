import { AlertTriangle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function AccessDenied() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-8 text-center">
				<AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
				<h1 className="mt-4 text-2xl font-bold text-gray-900">Access Denied</h1>
				<p className="mt-2 text-base text-gray-600">
					Sorry, you do not have permission to access this page.
				</p>
				<div className="mt-6">
					<Button asChild>
						<Link href="/app/dashboard">Return to Home</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
