"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  useAuth,
} from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function LeftSidebar(): React.JSX.Element {
  const { userId } = useAuth();
  const pathname = usePathname();
  return (
    <section className="sticky top-0 left-0 flex h-screen flex-col justify-between overflow-y-auto border-light-800 border-r bg-light-900 p-6 pt-36 shadow-light-300 max-sm:hidden lg:w-[266px] dark:border-dark-300 dark:bg-dark-200 dark:shadow-none">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          if (item.route === "/profile") {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            } else {
              return null;
            }
          }
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark-300 dark:text-light-900"} flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={25}
                height={25}
                className={`${isActive ? "" : "invert dark:invert-0"}`}
              />
              <p
                className={`${isActive ? "font-bold" : "font-medium"} max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-3">
          <SignInButton oauthFlow="popup">
            <Button className="min-h-[41px] w-full rounded-lg bg-light-800 px-4 py-3 font-medium text-sm/6 shadow-none dark:bg-dark-400">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={25}
                height={25}
                className="invert lg:hidden dark:invert-0"
              />
              <span className="primary-text-gradient max-lg:hidden">Вход</span>
            </Button>
          </SignInButton>
          <SignUpButton oauthFlow="popup">
            <Button className="min-h-[41px] w-full rounded-lg border border-light-700 bg-light-700 px-4 py-3 font-medium text-dark-400 text-sm/6 shadow-none dark:border-dark-400 dark:bg-dark-300 dark:text-light-900">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={25}
                height={25}
                className="invert lg:hidden dark:invert-0"
              />
              <span className="max-lg:hidden">Регистрация</span>
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-col gap-3">
          <SignOutButton>
            <Button className="min-h-[41px] w-full rounded-lg bg-light-800 px-4 py-3 font-medium text-sm/6 shadow-none dark:bg-dark-400">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                className="invert lg:hidden dark:invert-0"
              />
              <span className="primary-text-gradient max-lg:hidden">Выход</span>
            </Button>
          </SignOutButton>
        </div>
      </SignedIn>
    </section>
  );
}
