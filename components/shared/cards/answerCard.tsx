import Link from "next/link";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import EditDeleteAction from "../editDeleteAction";
import Metric from "../metric";

interface Props {
	userId?: string;
	_id: string;
	question: {
		_id: string;
		title: string;
	};
	author: {
		_id: string;
		name: string;
		image: string;
	};
	upvotes: number;
	createdAt: Date;
}

const AnswerCard = ({
	userId,
	_id,
	question,
	author,
	upvotes,
	createdAt,
}: Props) => {
	const showActionButtons = userId && userId === author._id;

	return (
		<Link
			href={`/question/${question._id}/#${_id}`}
			className="card-wrapper rounded-[10px] px-11 py-9"
		>
			<div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
				<div>
					<span className="line-clamp-1 flex font-normal text-[10px] text-dark-400 leading-[13px] sm:hidden dark:text-light-700">
						{getTimeStamp(createdAt)}
					</span>
					<h3 className="line-clamp-1 flex-1 font-semibold text-dark-200 text-lg sm:text-xl dark:text-light-900">
						{question.title}
					</h3>
				</div>

				{showActionButtons && userId && (
					<EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
				)}
			</div>

			<div className="mt-6 flex w-full flex-wrap items-center justify-between gap-3">
				<Metric
					imgUrl={author.image}
					alt="user avatar"
					value={author.name}
					title={` • asked ${getTimeStamp(createdAt)}`}
					href={`/profile/${author._id}`}
					textStyles="font-medium text-sm text-dark-400 dark:text-light-700"
					isAuthor
				/>

				<div className="flex-center gap-3">
					<Metric
						imgUrl="/assets/icons/like.svg"
						alt="like icon"
						value={formatNumber(upvotes)}
						title=" Votes"
						textStyles="font-medium text-sm text-dark-400 dark:text-light-800"
					/>
				</div>
			</div>
		</Link>
	);
};

export default AnswerCard;
