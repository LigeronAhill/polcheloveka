"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { createAnswer } from "@/lib/actions/answer.action";
import { AnswerFormSchema } from "@/lib/validations";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

export default function AnswerForm({
	author,
	question,
}: {
	author?: string;
	question: string;
}): React.JSX.Element {
	const path = usePathname();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const form = useForm<z.infer<typeof AnswerFormSchema>>({
		resolver: zodResolver(AnswerFormSchema),
		defaultValues: {
			answer: "",
		},
	});
	const handleCreateAnswer = async (
		values: z.infer<typeof AnswerFormSchema>,
	) => {
		setIsSubmitting(true);
		try {
			if (!author) {
				router.push("/signup");
			} else {
				await createAnswer({
					content: values.answer,
					author: author,
					path: path,
					question: question,
				});
				form.reset();
				setIsSubmitting(false);
			}
		} catch (error) {
			console.error(error);
			setIsSubmitting(false);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<div>
			<div className="flex flex-col justify-between gap-5 pt-4 sm:flex-row sm:items-center sm:gap-2">
				<h4 className="font-semibold text-base text-dark-400 dark:text-light-800">
					Введите ваш ответ:
				</h4>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleCreateAnswer)}
					className="mt-6 flex w-full flex-col gap-10"
				>
					<FormField
						control={form.control}
						name="answer"
						render={({ field }) => (
							<FormItem className="flex w-full flex-col gap-3">
								<FormControl className="mt-3.5">
									<Textarea
										className="min-h-48 border border-light-700 bg-light-900 text-base text-dark-300 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:border-dark-400 dark:bg-dark-300 dark:text-light-700"
										{...field}
									/>
								</FormControl>
								<FormDescription className="mt-2.5 font-normal text-light-500 text-sm">
									Ответьте на вопрос макисмально подробно и вежливо. От 24 до
									5000 символов.
								</FormDescription>
								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>
					<div className="flex justify-end">
						<Button
							type="submit"
							className="w-fit bg-linear-129 from-[#ff7000] to-[#e2995f] text-light-900"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Ответ отправляется" : "Ответить"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
