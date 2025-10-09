import { getQuestions } from "@/lib/actions/question.action";
import QuestionCard from "../shared/cards/questionCard";
import NoResult from "../shared/noResult";

export default async function QuestionCards(): Promise<React.JSX.Element> {
	const { questions } = await getQuestions({});
	return (
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
					title="Пока здесь нет вопросов..."
					description="Станьте тем, кто нарушит тишину! Задайте ваш вопрос и запустите обсуждение, которое поможет не только вам."
					href="/ask-question"
					buttonTitle="Задать вопрос"
				/>
			)}
		</section>
	);
}
