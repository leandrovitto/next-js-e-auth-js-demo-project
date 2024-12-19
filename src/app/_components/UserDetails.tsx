"use client";

import useUserSession from "@/hooks/use-user-session";
import Loader from "../../components/ui/loader";

export default function UserDetails() {
	const { user, status } = useUserSession();

	if (status === "loading") {
		return <Loader />;
	}

	if (user) {
		return (
			<>
				<div className="flex items-center gap-1">
					Signed in as {user.name}
					<div className="text-xs text-gray-600">({user.email})</div>
				</div>
				<pre className="text-xs p-4 bg-gray-800 text-white my-4 rounded-md">
					<code>{JSON.stringify(user, null, 2)}</code>
				</pre>
			</>
		);
	}
	return (
		<div>
			Not signed in <br />
			<pre className="text-xs p-4 bg-gray-800 text-white my-4 rounded-md">
				<code>{JSON.stringify(status, null, 2)}</code>
			</pre>
		</div>
	);
}
