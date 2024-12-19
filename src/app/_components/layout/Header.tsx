"use client";

import { useSession } from "next-auth/react";
import LoginButton from "@/app/_components/LoginButton";
import Logo from "@/app/_components/layout/Logo";
import { Loader } from "lucide-react";
import UserMenu from "./UserMenu";
import MenuDebug from "./MenuDebug";

const Header = () => {
	const { status } = useSession();

	return (
		<div className="border-b">
			<div className="flex h-16 justify-between items-center  p-2 px-4">
				<div>
					<Logo />
				</div>
				<div>
					<MenuDebug />
				</div>
				<div className="">
					{status === "loading" && <Loader />}
					{status === "authenticated" && <UserMenu />}
					{status === "unauthenticated" && <LoginButton />}
				</div>
			</div>
		</div>
	);
};

export default Header;
