import MonsterCard from "@/app/ui/monsters/monster-card";

import { Suspense } from "react";

export default function Page() {
	return (
		<main>
			<h1 className="mb-4 text-xl md:text-2xl">Monster Info</h1>
			<Suspense>
				<MonsterCard index={"zombie"} />
			</Suspense>
		</main>
	);
}
