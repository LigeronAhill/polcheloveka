import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { Suspense } from "react";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getTopPopularTags } from "@/lib/actions/tag.actions";
import RenderTag from "./renderTag";

export default function RightSidebar(): React.JSX.Element {
  return (
    <section className="sticky top-0 right-0 flex h-screen w-[350px] flex-col overflow-y-auto border-light-800 border-l bg-light-900 p-6 pt-36 shadow-light-300 max-xl:hidden dark:border-dark-300 dark:bg-dark-200 dark:shadow-none">
      <TopQuestions />
      <PopularTags />
    </section>
  );
}

async function TopQuestions(): Promise<React.JSX.Element> {
  const hotQuestions = await getHotQuestions();
  return (
    <div>
      <h3 className="font-bold text-dark-200 text-xl dark:text-light-900">
        Популярные воросы
      </h3>
      <Suspense fallback={<div>Loading...</div>}>
        <ul className="mt-7 flex w-full flex-col gap-7">
          {hotQuestions.map((question) => (
            <li key={question._id}>
              <Link
                href={`/question/${question._id}`}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="font-medium text-dark-500 text-sm dark:text-light-700">
                  {question.title}
                </p>
                <Image
                  src={"/assets/icons/chevron-right.svg"}
                  alt="chevron right"
                  width={20}
                  height={20}
                  className="invert dark:invert-0"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
}
async function PopularTags(): Promise<React.JSX.Element> {
  const popularTags = await getTopPopularTags();
  return (
    <div className="mt-16">
      <h3 className="font-bold text-dark-200 text-xl dark:text-light-900">
        Популярные метки
      </h3>
      <ul className="mt-7 flex flex-col gap-4">
        {popularTags.map((tag) => (
          <li key={tag._id}>
            <RenderTag
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.numberOfQuestions}
              showCount
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
