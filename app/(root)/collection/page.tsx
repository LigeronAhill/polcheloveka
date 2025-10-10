import Link from "next/link";
import HomeFilters from "@/components/home/homeFilters";
import QuestionCard from "@/components/shared/cards/questionCard";
import Filter from "@/components/shared/filter";
import NoResult from "@/components/shared/noResult";
import LocalSearchBar from "@/components/shared/search/localSearch";
import { Button } from "@/components/ui/button";
import { getSavedQuestions, getUserProfile } from "@/lib/actions/user.action";
import type { SavedQuestion } from "@/types";

export default async function CollectionPage(): Promise<React.JSX.Element> {
	const user = await getUserProfile();
	var usersSavedQuestions: SavedQuestion[] = [];
	if (user) {
		console.log(user);
		const { questions } = await getSavedQuestions({
			userId: user._id as string,
		});
		usersSavedQuestions = questions;
	}
	return (
		<>
			<div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
				<h1 className="font-bold text-3xl text-dark-100 tracking-tighter dark:text-light-900">
					Сохраненные вопросы
				</h1>
				<Link href={"/ask-question"} className="flex justify-end max-sm:w-full">
					<Button className="min-h-[46px] cursor-pointer bg-linear-129 from-primary-500 to-[#e2995f] px-4 py-3 text-light-900">
						Задать вопрос
					</Button>
				</Link>
			</div>
			<div className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:items-center md:grid-cols-1">
				<LocalSearchBar
					route="/"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="Искать вопрос..."
					className="sm:col-span-2"
				/>
				<Filter
					type="question"
					className="min-h-[56px] sm:min-w-[17px]"
					containerClass="hidden max-md:flex"
				/>
			</div>
			<HomeFilters />
			<section className="mt-10 flex w-full flex-col gap-6">
				{usersSavedQuestions.length > 0 ? (
					usersSavedQuestions.map((q) => (
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
						title="Вы еще не сохранили ни одного вопроса"
						description="Посмотрите, какие интересные вопросы задают наши гости"
						href="/"
						buttonTitle="На главную"
					/>
				)}
			</section>
		</>
	);
}
