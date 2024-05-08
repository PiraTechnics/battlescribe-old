import { challengeRatingXP } from "@/app/lib/5eTables";
import { monsterConditionImmunity, monsterSenses } from "./definitions";

export const capitalize = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const commaSeparatedList = (array: Array<string>) => {
	let string = "";
	array.forEach((entry, i) => {
		string += entry;
		if (i + 1 !== array.length) string += ", ";
	});

	return string;
};

export const abbreviatedName = (name: string) => {
	const nameArr = name.split(" ");
	return nameArr[nameArr.length - 1];
};

export const formatArmorDesc = (armor: string) => {};

export const formatXP = (xp: number) => {
	return `(${xp.toString()} XP)`;
};

/* export const getXPfromCR = (cr: number) => {
	let key;

	if (cr > 30 || cr < 0) {
		throw Error("Invalid Challenge Rating");
	}

	//convert cr to string
	if (cr === 0.2) key = "1/8";
	else if (cr === 0.25) key = "1/4";
	else if (cr === 0.5) key = "1/2";
	else key = cr.toString();

	const xp = challengeRatingXP.find((entry) => entry.cr === key);
	return `(${xp?.xp} XP)`;
}; */

export const formatChallengeRating = (cr: number) => {
	if (cr > 30 || cr < 0) {
		throw Error("Invalid Challenge Rating");
	}

	//convert cr to string
	if (cr === 0.2) return "1/8";
	else if (cr === 0.25) return "1/4";
	else if (cr === 0.5) return "1/2";
	else return cr.toString();
};

export const formatSpellcastingList = (spellcasting: string) => {
	//TODO: format from '-' separated values
	//return as array?
};

export const formatDamageTypeModifiers = (modifiers: Array<string>) => {
	let formattedMods: Array<string> = [];
	modifiers.forEach((entry) => {
		formattedMods.push(capitalize(entry));
	});

	return formattedMods;
};

export const formatConditionImmunities = (
	conditions: Array<monsterConditionImmunity>
) => {
	let formattedImmunities: Array<string> = [];
	conditions.forEach((entry) => {
		formattedImmunities.push(entry.name);
	});

	return formattedImmunities;
};

export const formatSenses = (senses: monsterSenses) => {
	let formattedSenses: Array<string> = [];
	const sensesArray = Object.entries(senses);

	sensesArray.forEach((entry) => {
		const senseName = capitalize(entry[0]).replace("_", " ");
		const senseVal = entry[1].toString();
		formattedSenses.push(`${senseName} ${senseVal}`);
	});

	return formattedSenses;
};

export const formatAbilityModifier = (score: number) => {
	if (!score || score > 30 || score < 0) {
		throw new Error("Invalid Ability Score"); //TODO: properly catch this somewhere
	}
	const result = Math.floor((score - 10) / 2);
	return `(${result >= 0 ? "+" : ""}${result})`;
};

export const formatProficiencyModifier = (value: number) => {
	return value >= 0 ? `+${value}` : value;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPages - 1, totalPages];
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [
		1,
		"...",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"...",
		totalPages,
	];
};
