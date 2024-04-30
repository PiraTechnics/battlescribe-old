"use client";

/* import {
	UserGroupIcon,
	HomeIcon,
	DocumentDuplicateIcon,
} from "@heroicons/react/24/outline"; */
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Chest, Demon, Feather, Swords, WizardHat } from "./icons";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
/* const links = [
	{ name: "Home", href: "/dashboard", icon: HomeIcon },
	{
		name: "Invoices",
		href: "/dashboard/invoices",
		icon: DocumentDuplicateIcon,
	},
	{ name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
]; */

const links = [
	{
		name: "Home",
		href: "/dashboard",
		icon: Feather,
	},
	{
		name: "Encounters",
		href: "/dashboard/encounters",
		icon: Swords,
	},
	{
		name: "Monsters",
		href: "/dashboard/monsters",
		icon: Demon,
	},
	{
		name: "Spells",
		href: "/dashboard/spells",
		icon: WizardHat,
	},
	{
		name: "Items",
		href: "/dashboard/items",
		icon: Chest,
	},
];

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon;
				return (
					<Link
						key={link.name}
						href={link.href}
						className={clsx(
							"flex h-[48px] grow items-center justify-center gap-4 rounded-md bg-gray-50 p-3 font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-6",
							{
								"bg-sky-100 text-blue-600": pathname === link.href,
							}
						)}
					>
						{/* <Image
							src={link.icon}
							alt="feather"
							width={16}
							height={16}
							className="text-white"
						/> */}

						{/* <LinkIcon className="w-6 h-6 " /> */}
						<LinkIcon className="w-7 h-7" />
						<p className="hidden md:block">{link.name}</p>
					</Link>
				);
			})}
		</>
	);
}
