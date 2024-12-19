import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const posts = [
	{
		id: 1,
		title: "First Post",
		href: "/posts/2",
		imageUrl: "/placeholder.svg",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet libero nec purus lacinia ultricies. Nullam nec nunc nec libero tincidunt ultricies. Nullam nec nunc",
	},
	{
		id: 2,
		title: "Second Post",
		href: "/posts/2",
		imageUrl: "/placeholder.svg",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet libero nec purus lacinia ultricies. Nullam nec nunc nec libero tincidunt ultricies. Nullam nec nunc",
	},
	{
		id: 3,
		title: "Third Post",
		href: "/posts/3",
		imageUrl: "/placeholder.svg",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet libero nec purus lacinia ultricies. Nullam nec nunc nec libero tincidunt ultricies. Nullam nec nunc",
	},
];

export async function GET(req: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	return NextResponse.json(posts);
}
