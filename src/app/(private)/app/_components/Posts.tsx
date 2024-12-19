"use client";
import type React from "react";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface Post {
	id: number;
	title: string;
	href: string;
	imageUrl: string;
	description: string;
}

const Posts: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch("/api/posts");
				if (!response.ok) {
					throw new Error("Failed to fetch posts");
				}
				const data: Post[] = await response.json();
				setPosts(data);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="space-y-6">
			<h1 className="text-xl font-bold tracking-tight">My Posts</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{posts.map((post) => (
					<Card key={post.id} className="overflow-hidden">
						<Link href={post.href}>
							<CardHeader className="p-0">
								<Image
									src={post.imageUrl}
									alt={`Cover image for ${post.title}`}
									width={400}
									height={200}
									className="object-cover w-full h-[200px]"
								/>
							</CardHeader>
							<CardContent className="p-4">
								<CardTitle className="text-lg font-semibold">
									{post.title}
								</CardTitle>
							</CardContent>
							<CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
								{post.description}
							</CardFooter>
						</Link>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Posts;
