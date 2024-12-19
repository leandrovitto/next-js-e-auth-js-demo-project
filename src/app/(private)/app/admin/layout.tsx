import { authOptions } from "@/lib/auth";
import { UserRole } from "@/types/roles";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AccessDenied from "../_components/AccessDenied";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login");
	}

	if (session?.user?.role !== UserRole.ADMIN) {
		return <AccessDenied />;
	}

	return <>{children}</>;
}
