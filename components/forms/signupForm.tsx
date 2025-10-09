"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const formSchema = z.object({
	name: z
		.string()
		.min(3, "Минимальная длина имени - 3 символа")
		.max(64, "Максимальная длина имени - 64 символа"),
	email: z.email("Введите корректный адрес элекстронной почты"),
	password: z
		.string()
		.min(8, "Минимальная длина пароля - 8 символов")
		.max(64, "Максимальная длина пароля - 64 символа"),
});

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const signInWithGithub = async () => {
		await authClient.signIn.social({
			provider: "github",
			callbackURL: "/",
		});
	};

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);

		const { data, error } = await authClient.signUp.email({
			name: values.name,
			email: values.email,
			password: values.password,
			callbackURL: "/",
		});
		if (data) {
			toast.success("Добро пожаловать!");
			router.push("/");
		} else {
			toast.error(error.message as string);
		}

		setIsLoading(false);
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Регистрация</CardTitle>
					<CardDescription>Войдите с аккаунтом</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="grid gap-6">
								<div className="flex flex-col gap-4">
									<Button
										variant="outline"
										className="w-full"
										type="button"
										onClick={signInWithGithub}
									>
										Github
									</Button>
								</div>
								<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
									<span className="relative z-10 bg-card px-2 text-muted-foreground">
										или введите данные
									</span>
								</div>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Имя</FormLabel>
													<FormControl>
														<Input placeholder="shadcn" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input placeholder="m@example.com" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="grid gap-3">
										<div className="flex flex-col gap-2">
											<FormField
												control={form.control}
												name="password"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Пароль</FormLabel>
														<FormControl>
															<Input
																placeholder="********"
																{...field}
																type="password"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<Link
												href="/forgot-password"
												className="ml-auto text-sm underline-offset-4 hover:underline"
											>
												Забыли пароль?
											</Link>
										</div>
									</div>
									<Button type="submit" className="w-full" disabled={isLoading}>
										{isLoading ? (
											<Loader2 className="size-4 animate-spin" />
										) : (
											"Отправить"
										)}
									</Button>
								</div>
								<div className="text-center text-sm">
									Уже зарегистрированы?{" "}
									<Link href="/login" className="underline underline-offset-4">
										Войдите
									</Link>
								</div>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-muted-foreground text-xs *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
				Нажимая "Отправить", вы соглашаетесь с <Link href="#">Правилами</Link> и{" "}
				<Link href="#">Политикой конфиденциальности</Link>.
			</div>
		</div>
	);
}
