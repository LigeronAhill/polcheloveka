import Image from "next/image";
import Link from "next/link";
import { getAnswers } from "@/lib/actions/answer.action";
import { getTimeStamp, pluralize } from "@/lib/utils";
import Filter from "./filter";

export async function AllAnswers({
	questionId,
	totalAnswers,
	page,
	filter,
}: {
	questionId: string;
	totalAnswers: number;
	page?: number;
	filter?: string;
}) {
	const answers = await getAnswers({ questionId: questionId });
	return (
		<div className="mt-11">
			<div className="flex items-center justify-between">
				<h3 className="bg-linear-129 from-[#ff7000] to-[#e2995f] bg-clip-text text-transparent">
					{totalAnswers} {pluralize(totalAnswers, "Ответ")}
				</h3>
				<Filter type="answer" />
			</div>
			<div>
				{answers.answers.map((answer) => (
					<article
						key={answer._id}
						className="border-light-700 border-b py-10 dark:border-dark-400"
					>
						<div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
							<Link
								href={`/profile/${answer.author._id}`}
								className="flex flex-1 items-center gap-1"
							>
								<Image
									src={answer.author.image}
									width={24}
									height={24}
									alt="profile"
									className="rounded-full object-cover max-sm:mt-0.5"
								/>
								<div className="flex flex-col sm:flex-row sm:items-center">
									<p className="font-semibold text-dark-300 text-sm dark:text-light-700">
										{answer.author.name}
									</p>
									<p className="mt-0.5 ml-2 line-clamp-1 text-light-400 text-xs dark:text-light-500">
										{getTimeStamp(answer.createdAt)}
									</p>
								</div>
							</Link>
							<div className="flex justify-end">VOTING</div>
						</div>
						{answer.content}
					</article>
				))}
			</div>
		</div>
	);
}
