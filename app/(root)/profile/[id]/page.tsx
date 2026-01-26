import Image from "next/image";
import Link from "next/link";
import type React from "react";
import AnswersTab from "@/components/shared/answersTab";
import ProfileLink from "@/components/shared/profileLink";
import QuestionTab from "@/components/shared/questionTab";
import Stats from "@/components/shared/stats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo, getUserProfile } from "@/lib/actions/user.action";
import { getTimeStamp } from "@/lib/utils";
import type { URLProps } from "@/types";

export default async function ProfilePage({
	params,
	searchParams,
}: URLProps): Promise<React.JSX.Element> {
	const resolvedParams = await params;
	const resolvedSearchParams = await searchParams;
	const userInfo = await getUserInfo({ userId: resolvedParams.id });
	const currentUser = await getUserProfile();
	let isAuthor = false;
	if (currentUser) {
		const userId = JSON.stringify(currentUser._id);
		const paramsId = JSON.stringify(resolvedParams.id);
		console.log(userId);
		console.log(paramsId);
		isAuthor = userId === paramsId;
	}
	return (
		<>
			<div className="flex flex-col-reverse items-start justify-between sm:flex-row">
				<div className="flex flex-col items-start justify-between gap-4 lg:flex-row">
					<Image
						src={userInfo?.user.image}
						alt="profile"
						width={140}
						height={140}
						className="rounded-full object-cover invert dark:invert-0"
					/>
					<div className="mt-3">
						<h2 className="font-bold text-2xl text-dark-100 dark:text-light-900">
							{userInfo.user.name}
						</h2>
						<div className="mt-5 flex flex-wrap items-center justify-start gap-5">
							{userInfo.user.location && (
								<ProfileLink
									imgUrl="/assets/icons/location.svg"
									title={userInfo.user.location}
								/>
							)}
							{userInfo.user.portfolioWebsite && (
								<ProfileLink
									imgUrl="/assets/icons/link.svg"
									title="Portfolio"
									href={userInfo.user.portfolioWebsite}
								/>
							)}
							<ProfileLink
								imgUrl="/assets/icons/calendar.svg"
								title={getTimeStamp(userInfo.user.createdAt)}
							/>
							{userInfo.user.bio && (
								<p className="mt-6 font-base font-normal text-dark-400 dark:text-light-800">
									{userInfo.user.bio}
								</p>
							)}
						</div>
					</div>
				</div>
				{currentUser && isAuthor && (
					<Link href={`/profile/edit/`}>
						<Button className="min-h-[46px] min-w-[175px] cursor-pointer bg-light-800 px-4 py-3 text-base text-dark-300 dark:bg-dark-400 dark:text-light-900">
							Редактировать профиль
						</Button>
					</Link>
				)}
			</div>
			<Stats
				totalQuestions={userInfo.totalQuestions}
				totalAnswers={userInfo.totalAnswers}
				badges={userInfo.badgeCounts}
				reputation={userInfo.reputation}
			/>
			<div className="mt-10 flex gap-10">
				<Tabs defaultValue="top-posts" className="flex-1">
					<TabsList className="min-h-[42px] bg-light-800 p-1 dark:bg-dark-400">
						<TabsTrigger value="top-posts">Вопросы</TabsTrigger>
						<TabsTrigger value="answers">Ответы</TabsTrigger>
					</TabsList>
					<TabsContent value="top-posts">
						<QuestionTab
							userId={resolvedParams.id}
							searchParams={resolvedSearchParams}
						/>
					</TabsContent>
					<TabsContent value="answers">
						<AnswersTab
							userId={resolvedParams.id}
							searchParams={resolvedSearchParams}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</>
	);
}
