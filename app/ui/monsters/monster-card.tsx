import { fetchMonster } from "@/app/lib/data";

export default async function MonsterCard() {
	const monster = await fetchMonster("zombie");

	if (!monster) {
		return <p className="mt-4 text-gray-400">No data available.</p>;
	}

	return (
		<div className="w-full md:col-span-4">
			<p>We got ourselves a {monster.name}!</p>
			<p>
				They are a {monster.size} {monster.type}
			</p>
		</div>
	);
}
