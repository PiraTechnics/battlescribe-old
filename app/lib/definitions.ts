export type Monster = {
	index: string;
	name: string;
	size: string;
	type: string;
	alignment: string;
	armor_class: [
		{
			type: string;
			value: number;
			desc: string;
		}
	];
};

export type monsterAction = {
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

export type monsterAbility = {
	name: string;
	desc: string;
	//Add spellcasting and other long-form options
};

export type monsterProficiency = {
	value: number;
	proficiency: {
		index: string;
		name: string;
		url: string;
	};
};

export type monsterSenses = {
	passive_perception: number;
	darkvision?: string;
	blindsight?: string;
	tremorsense?: string;
	truesight?: string;
};

export type monsterConditionImmunity = {
	index: string;
	name: string;
	url: string;
};
