import Image from "next/image";
import Link from "next/link";
import GlobalSearch from "../search/globalSearch";
import MobileNav from "./mobileNav";
import ThemeToggle from "./theme";

export default function Navbar(): React.JSX.Element {
	return (
		<nav className="fixed z-50 flex w-full items-center justify-between gap-5 bg-light-900 p-6 shadow-light-300 sm:px-12 dark:bg-dark-200 dark:shadow-none">
			<Link href={"/"} className="flex items-center gap-1">
				<Image
					src={"/assets/images/site-logo.svg"}
					width={23}
					height={23}
					alt="Polcheloveka"
				/>
				<p className="font-rubik text-3xl/11 text-dark-100 uppercase max-sm:hidden dark:text-light-900">
					Пол <span className="text-primary-500">Человека</span>
				</p>
			</Link>
			<GlobalSearch />
			<div className="flex items-center justify-between gap-5">
				<ThemeToggle />
				<MobileNav />
			</div>
		</nav>
	);
}
