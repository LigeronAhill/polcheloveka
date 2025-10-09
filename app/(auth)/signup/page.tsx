import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { SignupForm } from "@/components/forms/signupForm";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
	return (
		<div className="">
			{
				// <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
			}
			<Link href="/" className="absolute top-5 left-5">
				<Button variant="ghost">
					<ChevronLeft />
					На главную
				</Button>
			</Link>
			<div className="flex w-full max-w-sm flex-col gap-6">
				<SignupForm />
			</div>
		</div>
	);
}
