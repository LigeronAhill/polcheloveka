import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Question from "@/components/forms/question";
import { getUserById } from "@/lib/actions/user.action";

export default async function AskQuestion() {
  var { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  userId = "dummy_clerk_1736090400000";

  const mongoUser = await getUserById({ userId });
  const uid = JSON.stringify(mongoUser._id);
  console.log(uid);
  return (
    <div>
      <h1 className="font-bold text-3xl text-dark-100 dark:text-light-900">
        Задать вопрос
      </h1>
      <div className="mt-9">
        <Question mongoUserId={uid} />
      </div>
    </div>
  );
}
