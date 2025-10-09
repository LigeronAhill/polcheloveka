"use client";
import { SelectGroup } from "@radix-ui/react-select";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	AnswerFilters,
	GlobalSearchFilters,
	HomePageFilters,
	JobPageFilters,
	QuestionFilters,
	TagFilters,
	UserFilters,
} from "@/constants/filters";

interface Props {
	type:
		| "answer"
		| "user"
		| "question"
		| "tag"
		| "homepage"
		| "globalsearch"
		| "jobpage";
	className?: string;
	containerClass?: string;
}
export default function Filter({
	type,
	className,
	containerClass,
}: Props): React.JSX.Element {
	const filters = (() => {
		switch (type) {
			case "answer":
				return AnswerFilters;
			case "user":
				return UserFilters;
			case "question":
				return QuestionFilters;
			case "tag":
				return TagFilters;
			case "homepage":
				return HomePageFilters;
			case "globalsearch":
				return GlobalSearchFilters;
			case "jobpage":
				return JobPageFilters;
		}
	})();
	return (
		<div className={`relative ${containerClass}`}>
			<Select>
				<SelectTrigger
					className={`${className} w-full border border-light-800 bg-light-800 px-5 py-2.5 font-normal text-dark-500 text-sm dark:border-dark-300 dark:bg-dark-300 dark:text-light-700`}
				>
					<div className="line-clamp-1 flex-1 text-left">
						<SelectValue placeholder="Фильтр" />
					</div>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{filters.map((filter) => (
							<SelectItem key={filter.value} value={filter.value}>
								{filter.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
