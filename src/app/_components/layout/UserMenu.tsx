/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUserSession from "@/hooks/use-user-session";
import { UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const UserMenu = () => {
	const { user } = useUserSession();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="overflow-hidden rounded-full"
				>
					{user?.image ? (
						<img
							src={user?.image ?? "/next.svg"}
							width={"50"}
							height={"50"}
							alt="Avatar"
							className="overflow-hidden rounded-full"
						/>
					) : (
						<UserIcon size={24} />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<div className="flex flex-col gap-2 p-2 text-xs text-muted-foreground">
					<div>{user?.name}</div>
					<div>{user?.email}</div>
				</div>

				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href={"/app/dashboard"}> User Dashboard</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link href={"/app/admin"}> Admin Dashboard</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserMenu;
