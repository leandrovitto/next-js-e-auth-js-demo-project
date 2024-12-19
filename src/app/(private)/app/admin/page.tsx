import UserDetails from "@/app/_components/UserDetails";
import MetricsDashboard from "../_components/MetricsDashboard";

export default function Admin() {
	return (
		<div className="container">
			<div className="text-2xl font-bold items-center flex gap-2 my-4">
				Admin Page
				<span className="text-gray-400 text-base">(Private)</span>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-2">
				<div className="rounded-xl bg-muted/50 p-4 border">
					<UserDetails />
				</div>
				<div className="rounded-xl bg-muted/50 p-4 border" />
			</div>
			<div className="py-4">
				<MetricsDashboard />
			</div>
		</div>
	);
}
