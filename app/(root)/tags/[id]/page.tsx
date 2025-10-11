import Link from "next/link";
import QuestionCard from "@/components/shared/cards/questionCard";
import NoResult from "@/components/shared/noResult";
import LocalSearchBar from "@/components/shared/search/localSearch";
import { Button } from "@/components/ui/button";
import { getQuestionsByTagId } from "@/lib/actions/tag.actions";
import type { URLProps } from "@/types";

export default async function TagPage({
	params,
	searchParams,
}: URLProps): Promise<React.JSX.Element> {
	const [resolvedParams, resolvedSearchParams] = await Promise.all([
		params,
		searchParams,
	]);
	const { tagTitle, questions } = await getQuestionsByTagId({
		tagId: resolvedParams.id,
		searchQuery: resolvedSearchParams.q,
	});
	return (
		<>
			<div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
				<h1 className="font-bold text-3xl text-dark-100 tracking-tighter dark:text-light-900">
					Вопросы с меткой
					<span className="text-light-500 dark:text-light-500 mx-2 font-normal font-mono text-4xl">{`"${tagTitle}"`}</span>
				</h1>
				<Link href={"/ask-question"} className="flex justify-end max-sm:w-full">
					<Button className="min-h-[46px] cursor-pointer bg-linear-129 from-primary-500 to-[#e2995f] px-4 py-3 text-light-900">
						Задать вопрос
					</Button>
				</Link>
			</div>
			<div className="mt-11 w-full">
				<LocalSearchBar
					route="/"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="Искать вопрос..."
					className="sm:col-span-2"
				/>
			</div>
			<section className="mt-10 flex w-full flex-col gap-6">
				{questions.length > 0 ? (
					questions.map((q) => (
						<QuestionCard
							key={q._id}
							_id={q._id}
							title={q.title}
							tags={q.tags}
							author={q.author}
							upvotes={q.upvotes.length}
							views={q.views}
							answers={q.answers.length}
							createdAt={q.createdAt}
						/>
					))
				) : (
					<NoResult
						title="С этой меткой еще нет вопросов..."
						description="Посмотрите, какие интересные вопросы задают наши гости"
						href="/"
						buttonTitle="На главную"
					/>
				)}
			</section>
		</>
	);
}
