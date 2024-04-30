import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import { Logo } from "./icons";

export default function SideNav() {
	return (
		<div className="flex h-full flex-col px-3 py-4 md:px-2">
			<Link
				className="mb-2 flex items-center justify-center rounded-md bg-blue-600 p-4 md:h-30"
				href="/"
			>
				<div className="w-fit text-white flex items-end gap-1">
					<Logo className="w-16 h-16 -me-2" />
					<div>
						<p className="italic font-semibold text-3xl -mb-2 -ms-1">Battle</p>
						<p className="italic font-semibold text-2xl -ms-4">Scribe</p>
					</div>
				</div>
			</Link>
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
				<NavLinks />
				<div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
				<form>
					<button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
						<PowerIcon className="w-6" />
						<div className="hidden md:block">Sign Out</div>
					</button>
				</form>
			</div>
		</div>
	);
}
