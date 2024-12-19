import React, { Suspense, useState } from "react";
import Login from "../_components/Login";

const LoginPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
				<div className="w-full max-w-sm md:max-w-3xl">
					<Login />
				</div>
			</div>
		</Suspense>
	);
};

export default LoginPage;
