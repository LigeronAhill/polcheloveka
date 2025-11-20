"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
// import type * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/lib/actions/user.action";
import { ProfileSchema } from "@/lib/validations";
import { Textarea } from "../ui/textarea";

interface Props {
	id: string;
	name: string;
	username?: string;
	bio?: string;
	location?: string;
	portfolioWebsite?: string;
}

const Profile = ({
	id,
	name,
	username,
	bio,
	location,
	portfolioWebsite,
}: Props) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	const form = useForm<z.infer<typeof ProfileSchema>>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: name || "",
			username: username || "",
			portfolioWebsite: portfolioWebsite || "",
			location: location || "",
			bio: bio || "",
		},
	});

	async function onSubmit(values: z.infer<typeof ProfileSchema>) {
		setIsSubmitting(true);

		try {
			await updateUser({
				userId: id,
				updateData: {
					name: values.name,
					username: values.username,
					portfolioWebsite: values.portfolioWebsite,
					location: values.location,
					bio: values.bio,
				},
				path: pathname,
			});

			router.back();
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
				className="mt-9 flex w-full flex-col gap-9"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="font-semibold text-[16px] text-dark-400 leading-[20.8px] dark:text-light-800">
								Имя <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Ваше имя"
									className="min-h-[56px] border border-light-700 bg-light-800 font-normal text-[16px] text-dark-300 leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:border-dark-400 dark:bg-dark-300 dark:text-light-700"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="font-semibold text-[16px] text-dark-400 leading-[20.8px] dark:text-light-800">
								Имя пользователя
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Ваше имя пользователя"
									className="min-h-[56px] border border-light-700 bg-light-800 font-normal text-[16px] text-dark-300 leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:border-dark-400 dark:bg-dark-300 dark:text-light-700"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="portfolioWebsite"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="font-semibold text-[16px] text-dark-400 leading-[20.8px] dark:text-light-800">
								Ссылка на портфолио
							</FormLabel>
							<FormControl>
								<Input
									type="url"
									placeholder="URL вашего портфолио"
									className="min-h-[56px] border border-light-700 bg-light-800 font-normal text-[16px] text-dark-300 leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:border-dark-400 dark:bg-dark-300 dark:text-light-700"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="font-semibold text-[16px] text-dark-400 leading-[20.8px] dark:text-light-800">
								Город
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Откуда вы?"
									className="min-h-[56px] border border-light-700 bg-light-800 font-normal text-[16px] text-dark-300 leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:border-dark-400 dark:bg-dark-300 dark:text-light-700"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="font-semibold text-[16px] text-dark-400 leading-[20.8px] dark:text-light-800">
								Биография
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Расскажите о себе"
									className="min-h-[56px] border border-light-700 bg-light-800 font-normal text-[16px] text-dark-300 leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:border-dark-400 dark:bg-dark-300 dark:text-light-700"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="mt-7 flex justify-end">
					<Button
						type="submit"
						className="w-fit bg-linear-129 from-[#ff7000] to-[#e2995f] text-light-900"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Сохраняю..." : "Сохранить"}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default Profile;
// linear-gradient(129deg, #ff7000 0%, #e2995f 100%)
