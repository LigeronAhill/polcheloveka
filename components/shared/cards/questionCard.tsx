import Link from "next/link";
import { formatNumber, getTimeStamp, pluralize } from "@/lib/utils";
import Metric from "../metric";
import RenderTag from "../renderTag";

export default function QuestionCard({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: Props): React.JSX.Element {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="line-clamp-1 font-normal text-[10px] text-dark-400 leading-[13px] sm:hidden dark:text-light-700">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="line-clamp-1 flex-1 font-semibold text-dark-200 text-lg sm:text-2xl dark:text-light-900">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="mt-6 flex w-full flex-wrap justify-between gap-3">
        {
          <Metric
            imgUrl={author.image}
            alt="user"
            value={author.name}
            title={getTimeStamp(createdAt)}
            href={`/profile/${author._id}`}
            textStyles="text-dark-400 dark:text-light-700 text-sm font-medium"
          />
        }{" "}
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          value={formatNumber(upvotes)}
          title={pluralize(upvotes, "Голос")}
          textStyles="text-dark-400 dark:text-light-800 text-xs font-medium"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatNumber(answers)}
          title={pluralize(answers, "Ответ")}
          textStyles="text-dark-400 dark:text-light-800 text-xs font-medium"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumber(views)}
          title={pluralize(views, "Просмотр")}
          textStyles="text-dark-400 dark:text-light-800 text-xs font-medium"
        />
      </div>
    </div>
  );
}

interface Props {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: { _id: string; name: string; image?: string };
  upvotes: number;
  views: number;
  answers: number;
  createdAt: Date;
}
