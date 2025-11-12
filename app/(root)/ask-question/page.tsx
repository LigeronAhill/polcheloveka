import { redirect } from "next/navigation";
import Question from "@/components/forms/question";
import { getUserProfile } from "@/lib/actions/user.action";

export default async function AskQuestion() {
	const user = await getUserProfile();
	if (!user) {
		console.log("not allowed");
		redirect("/login");
	}

	return (
		<div>
			<h1 className="font-bold text-3xl text-dark-100 dark:text-light-900">
				Задать вопрос
			</h1>
			<div className="mt-9">
				<Question mongoUserId={JSON.stringify(user._id)} type="create" />
			</div>
		</div>
	);
}
