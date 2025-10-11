import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import RenderTag from "../renderTag";

interface Props {
	user: {
		_id: string;
		image: string;
		name: string;
	};
}
export default async function UserCard({
	user,
}: Props): Promise<React.JSX.Element> {
	const usersTags = await getTopInteractedTags({ userId: user._id });
	return (
		<Link
			href={`/profile/${user._id}`}
			className="w-full xs:w-[260px] shadow-light-100 max-xs:min-w-full dark:shadow-none"
		>
			<article className="flex w-full flex-col items-center justify-center rounded-xl border border-light-800 bg-light-900 p-8 dark:border-dark-300 dark:bg-dark-200">
				<Image
					src={user.image}
					alt="user image"
					width={100}
					height={100}
					className="rounded-full"
				/>
				<h3 className="line-clamp-1 font-bold text-dark-200 text-xs dark:text-light-900">
					{user.name}
				</h3>
				<div className="mt-5">
					{usersTags.length > 0 ? (
						<div className="flex items-center gap-2">
							{usersTags.map((tag) => (
								<RenderTag
									key={tag._id}
									_id={tag._id}
									name={tag.name}
									disableLink={true}
								/>
							))}
						</div>
					) : (
						<Badge>Нет меток...</Badge>
					)}
				</div>
			</article>
		</Link>
	);
}
