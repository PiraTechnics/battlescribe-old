//const api = "https://www.dnd5eapi.co/api/";
//"use server";

import Monster from "@/models/Monster";

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

export const legendaryDesc = (name: string, amount: number = 3) => {
	return `The ${name} can take ${amount} legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ${name} regains spent legendary actions at the start of its turn.`;
};
