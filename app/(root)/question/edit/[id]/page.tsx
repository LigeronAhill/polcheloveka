import Question from "@/components/forms/question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserProfile } from "@/lib/actions/user.action";

export default async function EditQuestionPage({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<React.JSX.Element> {
	const { id } = await params;
	const user = await getUserProfile();
	const user_id = user!._id;
	const question = await getQuestionById({ questionId: id });
	return (
		<>
			<h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
				Редактировать вопрос
			</h1>
			<div className="mt-9">
				<Question
					mongoUserId={JSON.stringify(user_id)}
					type="edit"
					questionDetails={JSON.stringify(question)}
				/>
			</div>
		</>
	);
}
