import Profile from "@/components/forms/profile";
import { getUserProfile } from "@/lib/actions/user.action";

export default async function ProfilePage(): Promise<React.JSX.Element> {
	const currentUser = await getUserProfile();
	if (!currentUser) {
		return <div>You are not authorized!!!</div>;
	}
	const userId = JSON.stringify(currentUser._id);
	return (
		<>
			<h1 className="font-bold text-[30px] text-dark-100 leading-[42px] tracking-tighter dark:text-light-900">
				Редактировать профиль
			</h1>

			<div className="mt-9">
				<Profile
					id={userId}
					name={currentUser.name}
					username={currentUser.username}
					bio={currentUser.bio}
					location={currentUser.location}
					portfolioWebsite={currentUser.portfolioWebsite}
				/>
			</div>
		</>
	);
}
