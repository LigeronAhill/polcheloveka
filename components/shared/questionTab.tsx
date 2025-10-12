import { getUserQuestions } from "@/lib/actions/user.action";
import type { SearchParamsProps } from "@/types";
import QuestionCard from "./cards/questionCard";
import Pagination from "./pagination";

interface Props extends SearchParamsProps {
	userId: string;
}

const QuestionTab = async ({ searchParams, userId }: Props) => {
	const result = await getUserQuestions({
		userId,
		page: searchParams.page ? +searchParams.page : 1,
	});

	return (
		<>
			{result.questions.map((question) => (
				<QuestionCard
					key={question._id}
					_id={question._id}
					title={question.title}
					tags={question.tags}
					author={question.author}
					upvotes={question.upvotes.length}
					views={question.views}
					answers={question.answers.length}
					createdAt={question.createdAt}
				/>
			))}

			<div className="mt-10">
				<Pagination
					pageNumber={searchParams?.page ? +searchParams.page : 1}
					isNext={result.isNextQuestions}
				/>
			</div>
		</>
	);
};

export default QuestionTab;
