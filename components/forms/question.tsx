"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { type ControllerRenderProps, useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { questionFormSchema } from "@/lib/validations";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";

interface Props {
	mongoUserId: string;
	type: "create" | "edit";
	questionDetails?: string;
}
interface QuestionDetails {
	_id: string;
	title: string;
	content: string;
	tags: { _id: string; name: string }[];
	author: { _id: string; name: string; image: string };
}

export default function Question({
	mongoUserId,
	type,
	questionDetails,
}: Props): React.JSX.Element {
	const router = useRouter();
	const path = usePathname();
	const [isSubmitting, setIsSubmitting] = useState(false);

	let parsedQuestionDetails: QuestionDetails;
	let groupedTags: string[] = [];
	let title = "";
	let explanation = "";

	if (questionDetails) {
		parsedQuestionDetails = JSON.parse(questionDetails);
		groupedTags = parsedQuestionDetails.tags.map((tag) => tag.name);
		title = parsedQuestionDetails.title;
		explanation = parsedQuestionDetails.content;
	}

	const form = useForm<z.infer<typeof questionFormSchema>>({
		resolver: zodResolver(questionFormSchema),
		defaultValues: {
			title: title,
			explanation: explanation,
			tags: groupedTags || [],
		},
	});
	const handleInputKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		field: ControllerRenderProps<{
			title: string;
			explanation: string;
			tags: string[];
		}>,
	) => {
		if (e.key === "Enter" && field.name === "tags") {
			e.preventDefault();
			const tagInput = e.target as HTMLInputElement;
			const tagValue = tagInput.value.trim();
			if (tagValue !== "") {
				if (tagValue.length > 15) {
					return form.setError("tags", {
						type: "required",
						message: "Метка должна быть короче 15 символов",
					});
				}
				if (!field.value.includes(tagValue as never)) {
					form.setValue("tags", [...field.value, tagValue.toUpperCase()]);
					tagInput.value = "";
					form.clearErrors("tags");
				} else {
					form.trigger();
				}
			}
		}
	};
	const handleTagRemove = (
		tag: string,
		field: ControllerRenderProps<{
			title: string;
			explanation: string;
			tags: string[];
		}>,
	) => {
		const v = field.value as string[];
		const newTags = v.filter((t: string) => t !== tag);
		form.setValue("tags", newTags);
	};

	async function onSubmit(values: z.infer<typeof questionFormSchema>) {
		setIsSubmitting(true);
		try {
			if (type === "create") {
				await createQuestion({
					title: values.title,
					content: values.explanation,
					tags: values.tags,
					author: JSON.parse(mongoUserId),
					path: path,
				});
				router.push("/");
			} else {
				await editQuestion({
					questionId: parsedQuestionDetails._id.toString(),
					title: values.title,
					content: values.explanation,
					path: path,
				});
				router.push(`/question/${parsedQuestionDetails._id}`);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-10"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col">
							<FormLabel className="font-semibold text-base text-dark-400 dark:text-light-800">
								Заголовок вопроса<span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Input
									className="min-h-14 border border-light-700 bg-light-900 text-base text-dark-300 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:border-dark-400 dark:bg-dark-300 dark:text-light-700"
									// placeholder="Как правильно выбрать..."
									{...field}
								/>
							</FormControl>
							<FormDescription className="mt-2.5 font-normal text-light-500 text-sm">
								Сформулируйте суть вопроса.
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="explanation"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col gap-3">
							<FormLabel className="font-semibold text-base text-dark-400 dark:text-light-800">
								Подробное описание вопроса
								<span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Textarea
									className="min-h-48 border border-light-700 bg-light-900 text-base text-dark-300 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:border-dark-400 dark:bg-dark-300 dark:text-light-700"
									{...field}
								/>
							</FormControl>
							<FormDescription className="mt-2.5 font-normal text-light-500 text-sm">
								Подробно опишите вопрос или возникшую проблему. Минимальная
								длина 100 символов.
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col">
							<FormLabel className="font-semibold text-base text-dark-400 dark:text-light-800">
								Метки вопроса<span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Input
									disabled={type === "edit"}
									className="min-h-14 border border-light-700 bg-light-900 text-base text-dark-300 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:border-dark-400 dark:bg-dark-300 dark:text-light-700"
									placeholder="Добавьте метки..."
									onKeyDown={(e) => handleInputKeyDown(e, field)}
								/>
							</FormControl>
							{field.value.length > 0 && (
								<div className="mt-2.5 flex items-center justify-start gap-2.5">
									{field.value.map((tag: string) => (
										<Badge
											key={tag}
											className="flex items-center justify-center gap-2 rounded-md border-none bg-light-800 px-4 font-medium text-[10px] text-light-400 uppercase dark:bg-dark-300 dark:text-light-500"
											onClick={() =>
												type === "create"
													? handleTagRemove(tag, field)
													: () => {}
											}
										>
											{tag}
											{type === "create" && (
												<Image
													src="/assets/icons/close.svg"
													alt="close"
													width={12}
													height={12}
													className="cursor-pointer object-contain invert-0 dark:invert"
												/>
											)}
										</Badge>
									))}
								</div>
							)}
							<FormDescription className="mt-2.5 font-normal text-light-500 text-sm">
								Добавьте от одной до трех тем, к которым относится вопрос.
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="primary-gradient w-fit text-light-900"
					disabled={isSubmitting}
				>
					{isSubmitting
						? type === "edit"
							? "Вносим изменения..."
							: "Публикуем..."
						: type === "edit"
							? "Изменить"
							: "Опубликовать"}
				</Button>
			</form>
		</Form>
	);
}
