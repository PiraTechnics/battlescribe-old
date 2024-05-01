//const api = "https://www.dnd5eapi.co/api/";
//"use server";

import Monster from "@/models/Monster";
//import dbConnect from "./db";

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
