//const api = "https://www.dnd5eapi.co/api/";
//"use server";

import Monster from "@/models/Monster";
import { unstable_noStore as noStore } from "next/cache";

/* export async function fetchMonster(name: string) {
	try {
		const res = await fetch(`${api}/monsters/${name}`);
		return res.json();
	} catch (error) {
		console.log("API Error: Failed to fetch monster");
	}
} */

export async function fetchMonster(name: string) {
	try {
		console.log(`fetching: ${name}`);

		const raw = await Monster.findOne({ index: name });
		const data = JSON.parse(JSON.stringify(raw));
		return data;
	} catch (error) {
		console.log(error);
	}
}

const ITEMS_PER_PAGE = 20;

export async function fetchFilteredMonsters(
	query: string,
	currentPage: number
) {
	noStore(); //don't cache results
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		const raw = await Monster.find(
			{ index: { $regex: query } },
			"index name size type challenge_rating" //need to search "inclusively" -- ie "dragon" should return all monsters with "dragon" in the name, and/or all of type "dragon"
			//"index name size type challenge_rating"
		)
			.skip(offset)
			.limit(ITEMS_PER_PAGE);
		const data = JSON.parse(JSON.stringify(raw));
		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchMonstersPages(query: string) {
	noStore();

	try {
		const totalItems = await Monster.find({
			index: { $regex: query },
		}).countDocuments();

		const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
		//console.log(totalPages);
		return totalPages;
	} catch (error) {
		console.log(error);
	}
}

export const legendaryDesc = (name: string, amount: number = 3) => {
	return `The ${name} can take ${amount} legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ${name} regains spent legendary actions at the start of its turn.`;
};
