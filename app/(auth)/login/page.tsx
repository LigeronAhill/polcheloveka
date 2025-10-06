import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/components/forms/loginForm";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
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
      <LoginForm />
    </div>
  );
}
