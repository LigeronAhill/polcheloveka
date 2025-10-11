"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
	downvoteQuestion,
	upvoteQuestion,
} from "@/lib/actions/question.action";
import type {
	AnswerVoteParams,
	QuestionVoteParams,
	ToggleSaveQuestionParams,
} from "@/lib/actions/shared.types";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatNumber } from "@/lib/utils";

export default function Votes({
	type,
	itemId,
	userId,
	upvotes,
	hasUpvoted,
	downvotes,
	hasDownvoted,
	hasSaved,
}: Props): React.JSX.Element {
	const hasViewed = useRef(false);
	const router = useRouter();
	const path = usePathname();
	const handleSave = async () => {
		if (!userId) {
			router.push("/signup");
			return;
		} else {
			const params: ToggleSaveQuestionParams = {
				userId: userId,
				questionId: itemId,
				path: path,
			};
			await toggleSaveQuestion(params);
		}
	};
	const handleVote = async (voteType: "upvote" | "downvote") => {
		if (!userId) {
			router.push("/signup");
			return;
		} else {
			if (type === "question") {
				const voteParams: QuestionVoteParams = {
					questionId: itemId,
					userId: userId,
					hasUpvoted: hasUpvoted,
					hasDownvoted: hasDownvoted,
					path: path,
				};
				if (voteType === "upvote") {
					await upvoteQuestion(voteParams);
				} else {
					await downvoteQuestion(voteParams);
				}
			} else {
				const answerParams: AnswerVoteParams = {
					answerId: itemId,
					userId: userId,
					hasUpvoted: hasUpvoted,
					hasDownvoted: hasDownvoted,
					path: path,
				};
				if (voteType === "upvote") {
					await upvoteAnswer(answerParams);
				} else {
					await downvoteAnswer(answerParams);
				}
			}
		}
	};

	useEffect(() => {
		if (type !== "question") return;
		if (hasViewed.current) return;
		hasViewed.current = true;
		viewQuestion({ questionId: itemId, userId: userId });
	}, [itemId, userId, type]);

	return (
		<div className="flex gap-5">
			<div className="flex items-center justify-center gap-2.5">
				<div className="flex items-center justify-center gap-1.5">
					<Image
						src={
							hasUpvoted
								? "/assets/icons/upvoted.svg"
								: "/assets/icons/upvote.svg"
						}
						width={18}
						height={18}
						alt="upvote"
						className="cursor-pointer"
						onClick={() => handleVote("upvote")}
					/>
					<div className="flex min-w-[18px] items-center justify-center rounded-sm bg-light-700 p-1 dark:bg-dark-400">
						<p className="font-semibold text-dark-400 text-sm dark:text-light-900">
							{formatNumber(upvotes)}
						</p>
					</div>
				</div>
				<div className="flex items-center justify-center gap-1.5">
					<Image
						src={
							hasDownvoted
								? "/assets/icons/downvoted.svg"
								: "/assets/icons/downvote.svg"
						}
						width={18}
						height={18}
						alt="downvote"
						className="cursor-pointer"
						onClick={() => handleVote("downvote")}
					/>
					<div className="flex min-w-[18px] items-center justify-center rounded-sm bg-light-700 p-1 dark:bg-dark-400">
						<p className="font-semibold text-dark-400 text-sm dark:text-light-900">
							{formatNumber(downvotes)}
						</p>
					</div>
				</div>
			</div>
			{type === "question" && (
				<Image
					src={
						hasSaved
							? "/assets/icons/star-filled.svg"
							: "/assets/icons/star-red.svg"
					}
					width={18}
					height={18}
					alt="star"
					className="cursor-pointer"
					onClick={() => {
						handleSave();
					}}
				/>
			)}
		</div>
	);
}

interface Props {
	type: "question" | "answer";
	itemId: string;
	userId?: string;
	upvotes: number;
	hasUpvoted: boolean;
	downvotes: number;
	hasDownvoted: boolean;
	hasSaved?: boolean;
}
