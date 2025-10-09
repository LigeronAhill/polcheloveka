import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function GlobalSearch(): React.JSX.Element {
	return (
		<div className="relative w-full max-w-[600px] max-lg:hidden">
			<div className="dark:dark-gradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl bg-light-800 px-4">
				<Image
					src={"/assets/icons/search.svg"}
					alt="search"
					width={24}
					height={24}
					className="cursor-pointer"
				/>
				<Input
					type="text"
					placeholder="Глобальный поиск..."
					className="border-none bg-light-800 font-normal text-base shadow-none outline-none placeholder:text-light-400 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:bg-transparent dark:placeholder:text-light-500"
				/>
			</div>
		</div>
	);
}
