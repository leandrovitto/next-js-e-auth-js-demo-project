import { Routes } from "@/app/routes";

const MenuDebug = () => {
	return (
		<pre>
			<nav>
				<ul className="flex gap-x-4">
					<li>
						<a
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
							href={Routes.HOME}
						>
							Home (Public)
						</a>
					</li>
					<li>
						<a
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
							href={Routes.DASHBOARD}
						>
							Dashoboard (Private)
						</a>
					</li>
				</ul>
			</nav>
		</pre>
	);
};

export default MenuDebug;
