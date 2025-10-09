import UserCard from "@/components/shared/cards/userCard";
import Filter from "@/components/shared/filter";
import NoResult from "@/components/shared/noResult";
import LocalSearchBar from "@/components/shared/search/localSearch";
import { getAllUsers } from "@/lib/actions/user.action";

export default async function CommunityPage(): Promise<React.JSX.Element> {
	const results = await getAllUsers({});

	return (
		<>
			<h1 className="font-bold text-3xl text-dark-100 tracking-tighter dark:text-light-900">
				Все пользователи
			</h1>
			<div className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:items-center">
				<LocalSearchBar
					route="/community"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="Искать интересных людей..."
					className="sm:col-span-2"
				/>
				<Filter type="user" className="min-h-[56px] sm:min-w-[17px]" />
			</div>
			<section className="mt-12 flex flex-wrap gap-4">
				{results.users.length > 0 ? (
					results.users.map((user) => (
						<UserCard
							key={user._id as string}
							user={{
								_id: user._id as string,
								name: user.name,
								image: user.image as string,
							}}
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
