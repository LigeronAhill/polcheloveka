"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";

export default function EditDeleteAction({
	type,
	itemId,
}: Props): React.JSX.Element {
	const path = usePathname();
	const router = useRouter();
	const handleEdit = () => {
		router.push(`/question/edit/${itemId.toString()}`);
	};
	const handleDelete = async () => {
		if (type === "question") {
			await deleteQuestion({ questionId: itemId, path });
		} else {
			await deleteAnswer({ answerId: itemId, path });
		}
	};
	return (
		<div className="flex items-center justify-end gap-3 max-sm:w-full">
			{type === "question" && (
				<Image
					src="/assets/icons/edit.svg"
					alt="Edit"
					width={14}
					height={14}
					className="cursor-pointer object-contain"
					onClick={handleEdit}
				/>
			)}
			<Image
				src="/assets/icons/trash.svg"
				alt="Delete"
				width={14}
				height={14}
				className="cursor-pointer object-contain"
				onClick={handleDelete}
			/>
		</div>
	);
}

interface Props {
	type: "question" | "answer";
	itemId: string;
}
