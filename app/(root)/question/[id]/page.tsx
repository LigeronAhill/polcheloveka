import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import AnswerForm from "@/components/forms/answer";
import { AllAnswers } from "@/components/shared/all_answers";
import Metric from "@/components/shared/metric";
import RenderTag from "@/components/shared/renderTag";
import Votes from "@/components/shared/votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserProfile } from "@/lib/actions/user.action";
import { auth } from "@/lib/auth";
import { formatNumber, getTimeStamp, pluralize } from "@/lib/utils";

export default async function QuestionDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<React.JSX.Element> {
	const { id } = await params;
	const question = await getQuestionById({ questionId: id });
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const userId = session?.user?.id;
	const profile = await getUserProfile();
	var hasSaved = false;
	if (profile) {
		hasSaved = profile.saved.includes(question._id);
	}
	return (
		<article>
			<div className="flex w-full flex-col items-center justify-start">
				<div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
					<Link
						href={`/profile/${question.author._id}`}
						className="flex items-center justify-start gap-1"
					>
						<Image
							src={question.author.image}
							className={`rounded-full ${question.author.image === "/assets/icons/avatar.svg" ? "invert dark:invert-0" : ""}`}
							alt="avatar"
							width={22}
							height={22}
						/>
						<p className="font-semibold text-base text-dark-300 dark:text-light-700">
							{question.author.name}
						</p>
					</Link>
					<div className="flex justify-end">
						<Votes
							type={"question"}
							itemId={id}
							userId={userId}
							upvotes={question.upvotes.length}
							hasUpvoted={question.upvotes.includes(userId)}
							downvotes={question.downvotes.length}
							hasDownvoted={question.downvotes.includes(userId)}
							hasSaved={hasSaved}
						/>
					</div>
				</div>
				<h2 className="mt-3.5 w-full text-left font-bold text-2xl text-dark-200 dark:text-light-900">
					{question.title}
				</h2>
				<div className="mt-5 mb-8 flex flex-wrap gap-4">
					<Metric
						imgUrl="/assets/icons/clock.svg"
						alt="clock"
						value={"Задан "}
						title={getTimeStamp(question.createdAt)}
						textStyles="text-dark-400 dark:text-light-800 text-xs font-medium"
					/>
					<Metric
						imgUrl="/assets/icons/message.svg"
						alt="message"
						value={formatNumber(question.answers.length)}
						title={pluralize(question.answers.length, "Ответ")}
						textStyles="text-dark-400 dark:text-light-800 text-xs font-medium"
					/>
					<Metric
						imgUrl="/assets/icons/eye.svg"
						alt="eye"
						value={formatNumber(question.views)}
						title={pluralize(question.views, "Просмотр")}
						textStyles="text-dark-400 dark:text-light-800 text-xs font-medium"
					/>
				</div>
			</div>
			<p>{question.content}</p>
			<div className="mt-8 flex flex-wrap gap-2 px-2">
				{question.tags.map((tag: { _id: string; name: string }) => (
					<RenderTag
						key={tag._id}
						_id={tag._id}
						name={tag.name}
						showCount={false}
					/>
				))}
			</div>
			<AllAnswers
				questionId={id}
				totalAnswers={question.answers.length}
				userId={userId}
			/>
			<AnswerForm author={userId} question={id} />
		</article>
	);
}
