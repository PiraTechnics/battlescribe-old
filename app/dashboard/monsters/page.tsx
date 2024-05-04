import { fetchMonstersPages } from "@/app/lib/data";
import MonsterTable from "@/app/ui/monsters/monster-table";
import Pagination from "@/app/ui/monsters/pagination";
import Search from "@/app/ui/monsters/search";

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = (await fetchMonstersPages(query)) as number;

	return (
		<main>
			<div className="w-full">
				<Search placeholder="Search Monsters..." />
			</div>

			<div className="my-4">
				<h1 className="text-xl md:text-2xl">Monsters</h1>
				<MonsterTable query={query} currentPage={currentPage} />
			</div>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</main>
	);
}
