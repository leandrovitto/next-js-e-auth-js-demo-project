"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from "recharts";

const lineData = [
	{ value: 40 },
	{ value: 50 },
	{ value: 45 },
	{ value: 42 },
	{ value: 38 },
	{ value: 42 },
	{ value: 45 },
	{ value: 58 },
];

const barData = [
	{ value: 350 },
	{ value: 400 },
	{ value: 300 },
	{ value: 380 },
	{ value: 280 },
	{ value: 350 },
	{ value: 400 },
	{ value: 300 },
];

export default function MetricsDashboard() {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-base font-medium">Total Revenue</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-4xl font-bold">$15,231.89</div>
					<p className="text-xs text-muted-foreground">
						+20.1% from last month
					</p>
					<div className="h-[80px] mt-4">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={lineData}>
								<Line
									type="monotone"
									dataKey="value"
									stroke="#000000"
									strokeWidth={1.5}
									dot={{ r: 3 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-base font-medium">Subscriptions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-4xl font-bold">+2350</div>
					<p className="text-xs text-muted-foreground">
						+180.1% from last month
					</p>
					<div className="h-[80px] mt-4">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={barData}>
								<Bar dataKey="value" fill="#000000" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
