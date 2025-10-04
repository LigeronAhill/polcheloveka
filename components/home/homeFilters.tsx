"use client";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";

export default function HomeFilters(): React.JSX.Element {
  const active = "newest";
  return (
    <div className="mt-10 grid grid-cols-4 gap-3 max-md:hidden">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          className={`cursor-pointer rounded-lg px-6 py-3 font-medium text-xs uppercase shadow-none ${active === filter.value ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 hover:dark:bg-dark-400" : "bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400"}`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
}
