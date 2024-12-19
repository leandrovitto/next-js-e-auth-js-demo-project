"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { UserRole } from "@/types/roles";

//if requiredRole is null, it means that the user is authenticated and don't need any specific role
const useUserSession = (requiredRole: UserRole | null = null) => {
	const { data: session, status } = useSession();
	const [hasRole, setHasRole] = useState(false);

	useEffect(() => {
		if (!requiredRole || session?.user?.role?.includes(requiredRole)) {
			setHasRole(true);
		} else {
			setHasRole(false);
		}
	}, [session, requiredRole]);

	return { hasRole, user: session?.user, status };
};

export default useUserSession;
