import { Divide } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RenderTag from "./renderTag";

export default function RightSidebar(): React.JSX.Element {
  return (
    <section className="sticky top-0 right-0 flex h-screen w-[350px] flex-col overflow-y-auto border-light-800 border-l bg-light-900 p-6 pt-36 shadow-light-300 max-xl:hidden dark:border-dark-300 dark:bg-dark-200 dark:shadow-none">
      <TopQuestions />
      <PopularTags />
    </section>
  );
}

function TopQuestions(): React.JSX.Element {
  const hotQuestions = [
    {
      _id: 1,
      title:
        "Какое покрытие выбрать для кухни: влагостойкий ламинат 33 класса или виниловый ламинат (LVT)?",
    },
    {
      _id: 2,
      title:
        "Обязательно ли делать стяжку перед укладкой плитки ПВХ, или можно выровнять пол фанерой?",
    },
    {
      _id: 3,
      title:
        "Правда ли, что светлый матовый ламинат так непрактичен, как о нем говорят? Или это миф?",
    },
    {
      _id: 4,
      title:
        'Что теплее и уютнее: классический паркет "елочкой" или современная инженерная доска?',
    },
    {
      _id: 5,
      title:
        "Стоит ли переплачивать за пробковый пол ради акустического комфорта, и насколько он устойчив к мебели на колесиках?",
    },
  ];
  return (
    <div>
      <h3 className="font-bold text-dark-200 text-xl dark:text-light-900">
        Популярные воросы
      </h3>
      <ul className="mt-7 flex w-full flex-col gap-7">
        {hotQuestions.map((question) => (
          <li key={question._id}>
            <Link
              href={`/questions/${question._id}`}
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
    </div>
  );
}
function PopularTags(): React.JSX.Element {
  const popularTags = [
    {
      _id: "1",
      name: "ламинат",
      totalQuestions: 12,
    },
    {
      _id: "2",
      name: "lvt",
      totalQuestions: 8,
    },
    {
      _id: "3",
      name: "линолеум",
      totalQuestions: 8,
    },
    {
      _id: "4",
      name: "паркет",
      totalQuestions: 5,
    },
    {
      _id: "5",
      name: "ковролин",
      totalQuestions: 4,
    },
  ];
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
              totalQuestions={tag.totalQuestions}
              showCount
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
