import TagCard from "@/components/shared/cards/tagCard";
import Filter from "@/components/shared/filter";
import NoResult from "@/components/shared/noResult";
import LocalSearchBar from "@/components/shared/search/localSearch";
import { getAllTags } from "@/lib/actions/tag.actions";

export default async function TagsPage(): Promise<React.JSX.Element> {
	const results = await getAllTags({});
	return (
		<>
			<h1 className="font-bold text-3xl text-dark-100 tracking-tighter dark:text-light-900">
				Все метки
			</h1>
			<div className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:items-center">
				<LocalSearchBar
					route="/tags"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="Искать интересных людей..."
					className="sm:col-span-2"
				/>
				<Filter type="tag" className="min-h-[56px] sm:min-w-[17px]" />
			</div>
			<section className="mt-12 flex flex-wrap gap-4">
				{results.tags.length > 0 ? (
					results.tags.map((tag) => (
						<TagCard
							key={tag._id}
							id={tag._id}
							name={tag.name}
							count={tag.questions.length}
						/>
					))
				) : (
					<NoResult
						title="Пока здесь нет людей..."
						description="Регистрируйтесь и станьте первым участником форума!"
						href="/signup"
						buttonTitle="Регистрация"
					/>
				)}
			</section>
		</>
	);
}
