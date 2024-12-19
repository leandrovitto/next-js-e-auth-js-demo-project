"use client";
import Link from "next/link";
import React from "react";

const Logo = () => {
	return (
		<div>
			<Link href="/">
				<div className="flex items-center gap-2 p-4">
					<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-gallery-vertical-end size-4"
						>
							<path d="M7 2h10"></path>
							<path d="M5 6h14"></path>
							<rect width="18" height="12" x="3" y="10" rx="2"></rect>
						</svg>
					</div>
					<div className="flex flex-col gap-0.5 leading-none font-bold">
						Acme Inc.
					</div>
				</div>
			</Link>
		</div>
	);
};

export default Logo;
