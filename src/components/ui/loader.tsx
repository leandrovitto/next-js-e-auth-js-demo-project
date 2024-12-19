import { LoaderCircle } from "lucide-react";
import React from "react";

const Loader = () => {
	return (
		<div>
			<LoaderCircle className="h-6 w-6 animate-spin" />
		</div>
	);
};

export default Loader;
