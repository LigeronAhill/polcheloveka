import Link from "next/link";

export default function TagCard({
  id,
  name,
  count,
}: {
  id: string;
  name: string;
  count: number;
}): React.JSX.Element {
  return (
    <Link href={`/tags/${id}`} className="shadow-light-100 dark:shadow-none">
      <article className="flex w-full flex-col rounded-2xl border border-light-800 bg-light-900 px-8 py-10 sm:w-[260px] dark:border-dark-300 dark:bg-dark-200">
        <div className="w-fit rounded-sm bg-light-800 px-5 py-1.5 dark:bg-dark-400">
          <p className="font-semibold text-base text-dark-300 dark:text-light-900">
            {name}
          </p>
        </div>
        <p className="mt-3.5 font-medium text-dark-400 text-xs dark:text-light-500">
          <span className="mr-2.5 bg-linear-129 from-[#ff7000] to-[#e2995f] bg-clip-text font-semibold text-base text-transparent">
            {count}+
          </span>
          вопросов
        </p>
      </article>
    </Link>
  );
}
