import Link from "next/link";
import HomeFilters from "@/components/home/homeFilters";
import QuestionCards from "@/components/home/questions";
import Filter from "@/components/shared/filter";
import LocalSearchBar from "@/components/shared/search/localSearch";
import { Button } from "@/components/ui/button";

export default function Home(): React.JSX.Element {
	return (
		<>
			<div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
				<h1 className="font-bold text-3xl text-dark-100 tracking-tighter dark:text-light-900">
					Все вопросы
				</h1>
				<Link href={"/ask-question"} className="flex justify-end max-sm:w-full">
					<Button className="min-h-[46px] cursor-pointer bg-linear-129 from-primary-500 to-[#e2995f] px-4 py-3 text-light-900">
						Задать вопрос
					</Button>
				</Link>
			</div>
			<div className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:items-center md:grid-cols-1">
				<LocalSearchBar
					route="/"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="Искать вопрос..."
					className="sm:col-span-2"
				/>
				<Filter
					type="homepage"
					className="min-h-[56px] sm:min-w-[17px]"
					containerClass="hidden max-md:flex"
				/>
			</div>
			<HomeFilters />
			<QuestionCards />
		</>
	);
}
