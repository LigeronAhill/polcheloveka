"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface Props {
	route: string;
	iconPosition: "left" | "right";
	imgSrc: string;
	placeholder: string;
	className?: string;
}

export default function LocalSearchBar({
	iconPosition,
	imgSrc,
	placeholder,
	className,
}: Props): React.JSX.Element {
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
				value=""
				onChange={() => {}}
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
