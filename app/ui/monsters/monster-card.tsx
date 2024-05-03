import { fetchMonster, legendaryDesc } from "@/app/lib/data";
import { challengeRatingXP } from "@/app/lib/5eTables";
import React from "react";

/* type speedList = {
	[key: string]: string;
}; */

interface MonsterCardProps {
	index: string;
}

//TODO: replace react key hardcoding with uuids

//TODO: move types to own file
type monsterAction = {
	name: string;
	desc: string;
	attack_bonus: number;
	damage: [
		{
			damage_type: {
				index: string;
				name: string;
				url: string;
			};
			damage_dice: string;
		}
	];
};

type monsterAbility = {
	name: string;
	desc: string;
	//Add spellcasting and other long-form options
};

type monsterProficiency = {
	value: number;
	proficiency: {
		index: string;
		name: string;
		url: string;
	};
};

type monsterSenses = {
	passive_perception: number;
	darkvision?: string;
	blindsight?: string;
	tremorsense?: string;
	truesight?: string;
};

type monsterConditionImmunity = {
	index: string;
	name: string;
	url: string;
};

//TODO: refactor utility functions into own file
const capitalize = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const commaSeparatedList = (array: Array<string>) => {
	let string = "";
	array.forEach((entry, i) => {
		string += entry;
		if (i + 1 !== array.length) string += ", ";
	});

	return string;
};

const abbreviatedName = (name: string) => {
	const nameArr = name.split(" ");
	return nameArr[nameArr.length - 1];
};

const formatDamageTypeModifiers = (modifiers: Array<string>) => {
	let formattedMods: Array<string> = [];
	modifiers.forEach((entry) => {
		formattedMods.push(capitalize(entry));
	});

	return formattedMods;
};

const formatConditionImmunities = (
	conditions: Array<monsterConditionImmunity>
) => {
	let formattedImmunities: Array<string> = [];
	conditions.forEach((entry) => {
		formattedImmunities.push(entry.name);
	});

	return formattedImmunities;
};

const formatSenses = (senses: monsterSenses) => {
	let formattedSenses: Array<string> = [];
	const sensesArray = Object.entries(senses);

	sensesArray.forEach((entry) => {
		const senseName = capitalize(entry[0]).replace("_", " ");
		const senseVal = entry[1].toString();
		formattedSenses.push(`${senseName} ${senseVal}`);
	});

	return formattedSenses;
};

const formatChallengeRating = (cr: number) => {
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
	return `${xp?.cr} (${xp?.xp} XP)`;
};

const formatAbilityModifier = (score: number) => {
	if (!score || score > 30 || score < 0) {
		throw new Error("Invalid Ability Score"); //TODO: properly catch this somewhere
	}
	const result = Math.floor((score - 10) / 2);
	return `(${result >= 0 ? "+" : ""}${result})`;
};

const formatProficiencyModifier = (value: number) => {
	return value >= 0 ? `+${value}` : value;
};

export default async function MonsterCard({ index }: MonsterCardProps) {
	const monster = await fetchMonster(index);

	if (!monster) {
		return <p className="mt-4 text-gray-400">No data available.</p>;
	}

	const speeds: { [key: string]: string } = monster.speed; //TS enforcing value is always string

	return (
		<article
			id={`monster-${monster.index}`}
			className="grid grid-flow-row divide-y-2 divide-red-500 gap-1"
		>
			<section id="heading">
				<h1>{monster.name}</h1>
				<h2>
					{monster.size} {monster.type}
					{", "}
					{monster.alignment}
				</h2>
			</section>
			<section id="base-stats">
				<div className="flex gap-1">
					<span className="font-bold">Armor Class:</span>
					<span>{monster.armor_class[0].value}</span>
				</div>
				<div className="flex gap-1">
					<span className="font-bold">Hit Points:</span>
					<span>{monster.hit_points}</span>
					<span>({monster.hit_points_roll})</span>
				</div>
				<div className="flex gap-1">
					<span className="font-bold">Speed:</span>
					{Object.entries(speeds).map(([key, value]) => (
						<span key={monster.index + key}>
							<span>
								{key} {value}
							</span>
						</span>
					))}
				</div>
			</section>
			<section id="ability-scores" className="flex justify-between">
				<div className="text-center">
					<p className="font-bold">STR</p>
					<p>
						{monster.strength} {formatAbilityModifier(monster.strength)}
					</p>
				</div>
				<div className="text-center">
					<p className="font-bold">DEX</p>
					<p>
						{monster.dexterity} {formatAbilityModifier(monster.dexterity)}
					</p>
				</div>
				<div className="text-center">
					<p className="font-bold">CON</p>
					<p>
						{monster.constitution} {formatAbilityModifier(monster.constitution)}
					</p>
				</div>
				<div className="text-center">
					<p className="font-bold">INT</p>
					<p>
						{monster.intelligence} {formatAbilityModifier(monster.intelligence)}
					</p>
				</div>
				<div className="text-center">
					<p className="font-bold">WIS</p>
					<p>
						{monster.wisdom} {formatAbilityModifier(monster.wisdom)}
					</p>
				</div>
				<div className="text-center">
					<p className="font-bold">CHA</p>
					<p>
						{monster.charisma} {formatAbilityModifier(monster.charisma)}
					</p>
				</div>
			</section>
			<section id="attributes">
				{monster.proficiencies.length > 0 && (
					<>
						<div id="saving-throws" className="flex gap-1">
							<span className="font-bold">Saving Throws</span>
							{monster.proficiencies.map((entry: monsterProficiency) => {
								if (entry.proficiency.name.includes("Saving Throw")) {
									//TODO: clean this up with helper functions up top
									const name = entry.proficiency.name.split(": ")[1];
									return (
										<span
											key={monster.index + entry.proficiency.index}
											className="pe-2"
										>
											{name} {formatProficiencyModifier(entry.value)}
										</span>
									);
								}
							})}
						</div>

						<div id="skills" className="flex gap-1">
							<span className="font-bold">Skills</span>
							{monster.proficiencies.map((entry: monsterProficiency) => {
								if (entry.proficiency.name.includes("Skill")) {
									//TODO: clean this up with helper functions up top
									const name = entry.proficiency.name.split(": ")[1];
									return (
										<span
											key={monster.index + entry.proficiency.index}
											className="pe-2"
										>
											{name} {formatProficiencyModifier(entry.value)}
										</span>
									);
								}
							})}
						</div>
					</>
				)}
				{monster.damage_vulnerabilities.length > 0 && (
					<div id="damage-vulnerabilities" className="flex gap-1">
						<span className="font-bold">Damage Vulnerabilities</span>
						<span>
							{commaSeparatedList(
								formatDamageTypeModifiers(monster.damage_vulnerabilities)
							)}
						</span>
					</div>
				)}
				{monster.damage_resistances.length > 0 && (
					<div id="damage-resistances" className="flex gap-1">
						<span className="font-bold">Damage Resistances</span>
						<span>
							{commaSeparatedList(
								formatDamageTypeModifiers(monster.damage_resistances)
							)}
						</span>
					</div>
				)}
				{monster.damage_immunities.length > 0 && (
					<div id="damage-immunities" className="flex gap-1">
						<span className="font-bold">Damage Immunities</span>
						<span>
							{commaSeparatedList(
								formatDamageTypeModifiers(monster.damage_immunities)
							)}
						</span>
					</div>
				)}
				{monster.condition_immunities.length > 0 && (
					<div id="condition-immunities" className="flex gap-1">
						<span className="font-bold">Condition Immunities</span>
						<span>
							{commaSeparatedList(
								formatConditionImmunities(monster.condition_immunities)
							)}
						</span>
					</div>
				)}
				<div id="senses" className="flex gap-1">
					<span className="font-bold">Senses</span>
					<span>{commaSeparatedList(formatSenses(monster.senses))}</span>
				</div>
				<div id="languages" className="flex gap-1">
					<span className="font-bold">Languages</span>
					<span>{capitalize(monster.languages)}</span>
				</div>
				<div id="challenge-rating" className="flex gap-1">
					<span className="font-bold">Challenge</span>
					<span>{formatChallengeRating(monster.challenge_rating)}</span>
				</div>
			</section>
			{monster.special_abilities.length > 0 && (
				<section id="special-abilities">
					{monster.special_abilities.map((entry: monsterAbility) => (
						<div key={monster.index + entry.name} className="mb-2">
							<span className="font-semibold italic">{entry.name}. </span>
							<span>{entry.desc}</span>
						</div>
					))}
				</section>
			)}
			{monster.actions.length > 0 && (
				<section id="actions">
					{monster.actions.map((entry: monsterAction) => (
						<div key={monster.index + entry.name} className="mb-2">
							<span className="font-semibold italic">{entry.name}. </span>
							<span>{entry.desc}</span>
						</div>
					))}
				</section>
			)}

			{monster.legendary_actions && (
				<section id="legendary-actions">
					<div className="mt-2 mb-4">
						<h4 className="text-xl font-semibold">Legendary Actions</h4>
						<p>{legendaryDesc(abbreviatedName(monster.name.toLowerCase()))}</p>
					</div>
					{monster.legendary_actions.map((entry: monsterAction) => (
						<div key={monster.index + entry.name} className="mb-2">
							<span className="font-semibold italic">{entry.name}. </span>
							<span>{entry.desc}</span>
						</div>
					))}
				</section>
			)}
		</article>
	);
}
