import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function RenderTag({
	_id,
	name,
	totalQuestions,
	showCount,
	disableLink = false,
}: {
	_id: string;
	name: string;
	totalQuestions?: number;
	showCount?: boolean;
	disableLink?: boolean;
}): React.JSX.Element {
	// return (
	// 	<Link href={`/tags/${_id}`} className="flex justify-between gap-2">
	// 		<Badge className="rounded-md border-none bg-light-800 px-4 py-2 font-medium text-light-400 text-xs uppercase dark:bg-dark-300 dark:text-light-500">
	// 			{name}
	// 		</Badge>
	// 		{showCount && (
	// 			<p className="font-medium text-dark-500 text-sm dark:text-light-700">
	// 				{totalQuestions}
	// 			</p>
	// 		)}
	// 	</Link>
	// );
	const tagContent = (
		<>
			<Badge className="rounded-md border-none bg-light-800 px-4 py-2 font-medium text-light-400 text-xs uppercase dark:bg-dark-300 dark:text-light-500">
				{name}
			</Badge>
			{showCount && (
				<p className="font-medium text-dark-500 text-sm dark:text-light-700">
					{totalQuestions}
				</p>
			)}
		</>
	);

	if (disableLink) {
		return <div className="flex justify-between gap-2">{tagContent}</div>;
	}

	return (
		<Link href={`/tags/${_id}`} className="flex justify-between gap-2">
			{tagContent}
		</Link>
	);
}
