"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface Props {
	route: string;
	iconPosition: "left" | "right";
	imgSrc: string;
	placeholder: string;
	className?: string;
}

export default function LocalSearchBar({
	route,
	iconPosition,
	imgSrc,
	placeholder,
	className,
}: Props): React.JSX.Element {
	const router = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();

	const query = searchParams.get("q");

	const [search, setSearch] = useState(query || "");

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (search) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: "q",
					value: search,
				});
				router.push(newUrl, { scroll: false });
			} else {
				if (pathName === route) {
					const newUrl = removeKeysFromQuery({
						params: searchParams.toString(),
						keysToRemove: ["q"],
					});
					router.push(newUrl, { scroll: false });
				}
			}
		}, 500);
		return () => clearTimeout(delayDebounceFn);
	}, [search, router, pathName, route, searchParams]);

	return (
		<div
			className={`dark:dark-gradient flex min-h-[56px] grow items-center gap-4 rounded-lg bg-light-800 px-4 ${className}`}
		>
			{iconPosition === "left" && (
				<Image
					src={imgSrc}
					alt="search"
					width={24}
					height={24}
					className="cursor-pointer"
				/>
			)}
			<Input
				type="text"
				placeholder={placeholder}
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
				className="border-none bg-transparent font-normal text-base text-dark-400 shadow-none outline-none placeholder:text-light-400 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:bg-transparent dark:text-light-700 dark:placeholder:text-light-500"
			/>
			{iconPosition === "right" && (
				<Image
					src={imgSrc}
					alt="search"
					width={24}
					height={24}
					className="cursor-pointer"
				/>
			)}
		</div>
	);
}
