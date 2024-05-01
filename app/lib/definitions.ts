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
