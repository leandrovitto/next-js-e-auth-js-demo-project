import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AppBreadcrumb from "./_components/AppBreadcrumb";
import { AppSidebar } from "./_components/AppSidebar";
import Menu from "@/app/_components/layout/MenuDebug";
import UserMenu from "@/app/_components/layout/UserMenu";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login");
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex justify-between align-middle h-16 shrink-0 items-center gap-2 border-b px-4">
					<div className="flex shrink-0 items-center gap-2">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<AppBreadcrumb />
					</div>
					<div>
						<UserMenu />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
