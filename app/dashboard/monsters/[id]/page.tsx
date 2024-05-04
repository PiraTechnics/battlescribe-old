import MonsterCard from "@/app/ui/monsters/monster-card";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	return (
		<main>
			<h1 className="mb-4 text-xl md:text-2xl">Monster Info</h1>
			<Suspense>
				<MonsterCard index={id} />
			</Suspense>
		</main>
	);
}
