export interface Monster {
	index: string;
	name: string;
	size: creatureSize;
	type: creatureType;
	alignment: string;
	armor_class: [monsterArmorClass];
	hit_points: number;
	hit_dice: string;
	hit_points_roll: string;
	speed: creatureSpeed;
	strength: abilityScore;
	dexterity: abilityScore;
	constitution: abilityScore;
	intelligence: abilityScore;
	wisdom: abilityScore;
	charisma: abilityScore;
	proficiencies: [monsterProficiency];
	damage_vulnerabilities: [string]; //should this and the other damage arrays be a list of possible damage types, loaded from db?
	damage_resistances: [string];
	damage_immunities: [string];
	condition_immunities: [string]; //should be a list of possible conditions, loaded from db?
	senses: monsterSenses;
	languages: string;
	challenge_rating: number;
	proficiency_bonus: number;
	xp: number;
	special_abilities: [monsterAbility];
	actions: [monsterAction];
	legendary_actions?: [monsterAbility];

	url: string; //not necessary i think? this is the api url
}

//should we enforce the values (as enums/options) based on what's in the db? can we even do this? Note this appies to the creature sizes, types, ability scores, basically anything we've hardcoded a set of options for

export type creatureSize =
	| "Tiny"
	| "Small"
	| "Medium"
	| "Large"
	| "Huge"
	| "Gargantuan";

export type creatureType =
	| "beast"
	| "humanoid"
	| "dragon"
	| "monstrosity"
	| "undead"
	| "fiend"
	| "elemental"
	| "plant"
	| "construct"
	| "celestial"
	| "fey"
	| "aberration"
	| "giant"
	| "ooze"
	| "swarm of tiny beasts";

//Note: Should we include subtypes or nah?

export type abilityScore =
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24
	| 25
	| 26
	| 27
	| 28
	| 29
	| 30;

export interface monsterArmorClass {
	type: `natural` | "dex" | "armor" | "spell" | "condition";
	value: number;
	armor?: {
		index: string;
		name: string;
		url: string;
	};
	spell?: {
		index: string;
		name: string;
		url: string;
	};
	condition?: {
		index: string;
		name: string;
		url: string;
	};
}

export interface creatureSpeed {
	walk?: string;
	fly?: string;
	climb?: string;
	swim?: string;
	burrow?: string;
	hover?: boolean;
}

export interface monsterAction {
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
}

export interface monsterSenses {
	passive_perception: number;
	darkvision?: string;
	blindsight?: string;
	tremorsense?: string;
	truesight?: string;
}

export interface specialAbility {
	attack_bonus?: never; //not sure what this is, maybe get rid of it
	damage?: [
		{
			damage_dice: string;
			damage_type: {
				index: string;
				name: string;
				url: string;
			};
		}
	];
	dc?: {
		dc_type: {
			index: string;
			name: string;
			url: string;
		};
		dc_value: number;
		success_type: "none" | "half";
	};
	desc: string;
	name: string;
	//TODO: fill in below
	spellcasting?: any;
	usage?: any;
}

/// OLD TYPES, need to change/fix up ///

export interface monsterAbility {
	name: string;
	desc: string;
	//Add spellcasting and other long-form options
}

export interface monsterProficiency {
	value: number;
	proficiency: {
		index: string;
		name: string;
		url: string;
	};
}

export interface monsterConditionImmunity {
	index: string;
	name: string;
	url: string;
}
