import { fetchFilteredMonsters } from "@/app/lib/data";
import { capitalize, formatChallengeRating } from "@/app/lib/utils";
import Link from "next/link";

type MonsterTableEntry = {
	id: string;
	name: string;
	index: string;
	type: string;
	size: string;
	challenge_rating: number;
};

export default async function MonsterTable({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const monsters = await fetchFilteredMonsters(query, currentPage);

	return (
		<table className="min-w-full divide-y divide-gray-300">
			<thead>
				<tr>
					<th
						scope="col"
						className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
					>
						Name
					</th>
					<th
						scope="col"
						className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
					>
						Type
					</th>
					<th
						scope="col"
						className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
					>
						Size
					</th>
					<th
						scope="col"
						className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
					>
						CR
					</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-200">
				{monsters.map((monster: MonsterTableEntry) => (
					<tr key={monster.id}>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
							<Link href={`/dashboard/monsters/${monster.index}`}>
								{monster.name}
							</Link>
						</td>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
							{capitalize(monster.type)}
						</td>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
							{monster.size}
						</td>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
							{formatChallengeRating(monster.challenge_rating)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
