"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { QuestionFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { Button } from "../ui/button";

export default function HomeFilters(): React.JSX.Element {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [active, setActive] = useState("");
	const handleTypeClick = (item: string) => {
		if (active === item) {
			setActive("");
			const newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: "filter",
				value: null,
			});
			router.push(newUrl, { scroll: false });
		} else {
			setActive(item);
			const newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: "filter",
				value: item.toLowerCase(),
			});
			router.push(newUrl, { scroll: false });
		}
	};
	return (
		<div className="mt-10 grid grid-cols-5 gap-3 max-md:hidden">
			{QuestionFilters.map((filter) => (
				<Button
					key={filter.value}
					onClick={() => handleTypeClick(filter.value)}
					className={`cursor-pointer rounded-lg px-6 py-3 font-medium text-xs uppercase shadow-none ${active === filter.value ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 hover:dark:bg-dark-400" : "bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400"}`}
				>
					{filter.name}
				</Button>
			))}
		</div>
	);
}
