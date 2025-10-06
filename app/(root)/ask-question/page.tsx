import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Question from "@/components/forms/question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@/lib/auth";

export default async function AskQuestion() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  if (!userId) {
    console.log("not allowed");
    redirect("/login");
  }

  const mongoUser = await getUserById(userId);
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
