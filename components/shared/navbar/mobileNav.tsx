"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";

export default function MobileNav(): React.JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={"/assets/icons/hamburger.svg"}
          alt="mobile menu"
          width={36}
          height={36}
          className="invert sm:hidden dark:invert-0"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="border-none bg-light-900 dark:bg-dark-200"
      >
        <SheetTitle>
          <Link href={"/"} className="flex items-center gap-1 p-6">
            <Image
              src={"/assets/images/site-logo.svg"}
              width={23}
              height={23}
              alt="Polcheloveka"
            />
            <p className="font-rubik text-dark-100 text-xl uppercase dark:text-light-900">
              Пол <span className="text-primary-500">Человека</span>
            </p>
          </Link>
        </SheetTitle>
        <SheetClose asChild>
          <NavContent />
        </SheetClose>
        <SignedOut>
          <div className="flex flex-col gap-3 px-4 pb-8">
            <SheetClose asChild>
              <SignInButton oauthFlow="popup">
                <Button className="min-h-[41px] w-full rounded-lg bg-light-800 px-4 py-3 font-medium text-sm/6 shadow-none dark:bg-dark-400">
                  <span className="primary-text-gradient">Вход</span>
                </Button>
              </SignInButton>
            </SheetClose>
            <SheetClose asChild>
              <SignUpButton oauthFlow="popup">
                <Button className="min-h-[41px] w-full rounded-lg border border-light-700 bg-light-700 px-4 py-3 font-medium text-dark-400 text-sm/6 shadow-none dark:border-dark-400 dark:bg-dark-300 dark:text-light-900">
                  Регистрация
                </Button>
              </SignUpButton>
            </SheetClose>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex flex-col gap-3 px-4 pb-8">
            <SheetClose asChild>
              <SignOutButton>
                <Button className="min-h-[41px] w-full rounded-lg bg-light-800 px-4 py-3 font-medium text-sm/6 shadow-none dark:bg-dark-400">
                  <span className="primary-text-gradient">Выход</span>
                </Button>
              </SignOutButton>
            </SheetClose>
          </div>
        </SignedIn>
      </SheetContent>
    </Sheet>
  );
}
function NavContent(): React.JSX.Element {
  const pathname = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 px-4 pt-16">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark-300 dark:text-light-900"} flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert dark:invert-0"}`}
              />
              <p className={`${isActive ? "font-bold" : "font-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
}
