import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function NoResult({
	title,
	description,
	href,
	buttonTitle,
}: {
	title: string;
	description: string;
	href: string;
	buttonTitle: string;
}): React.JSX.Element {
	return (
		<div className="mt-10 flex w-full flex-col items-center justify-center">
			<Image
				src={"/assets/images/light-illustration.png"}
				alt="no result"
				width={270}
				height={200}
				className="block object-contain dark:hidden"
			/>
			<Image
				src={"/assets/images/dark-illustration.png"}
				alt="no result"
				width={270}
				height={200}
				className="hidden object-contain dark:block"
			/>
			<h2 className="mt-9 font-bold text-2xl text-dark-200 dark:text-light-900">
				{title}
			</h2>
			<p className="my-3.5 max-w-md text-center font-normal text-dark-500 text-sm dark:text-light-700">
				{description}
			</p>
			<Button
				asChild
				className="mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 font-medium text-base text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900"
			>
				<Link href={href}>{buttonTitle}</Link>
			</Button>
		</div>
	);
}
