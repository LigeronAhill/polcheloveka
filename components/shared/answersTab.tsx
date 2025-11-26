import {getUserAnswers} from "@/lib/actions/user.action";
import AnswerCard from "./cards/answerCard";
import Pagination from "./pagination";

interface Props {
    searchParams: { [key: string]: string | undefined };
    userId: string;
    clerkId?: string | null;
}

const AnswersTab = async ({searchParams, userId}: Props) => {
    const result = await getUserAnswers({
        userId,
        page: searchParams.page ? +searchParams.page : 1,
    });

    return (
        <>
            {result.answers.map((item) => (
                <AnswerCard
                    key={item._id}
                    userId={userId}
                    _id={item._id}
                    question={item.question}
                    author={item.author}
                    upvotes={item.upvotes.length}
                    createdAt={item.createdAt}
                />
            ))}

            <div className="mt-10">
                <Pagination
                    pageNumber={searchParams?.page ? +searchParams.page : 1}
                    isNext={result.isNextAnswer}
                />
            </div>
        </>
    );
};

export default AnswersTab;
