import UserDetails from "@/app/_components/UserDetails";
import Posts from "../_components/Posts";

export default function Dashoboard() {
	return (
		<div className="container">
			<div className="text-2xl font-bold items-center flex gap-2 my-4">
				Dashboard Page
				<span className="text-gray-400 text-base">(Private)</span>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-2">
				<div className="rounded-xl bg-muted/50 p-4 border">
					<UserDetails />
				</div>
				<div className="rounded-xl bg-muted/50 p-4 border" />
			</div>
			<div className="py-4">
				<Posts />
			</div>
		</div>
	);
}
