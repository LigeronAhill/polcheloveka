"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

export default function LeftSidebar(): React.JSX.Element {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
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
                width={20}
                height={20}
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
      <div>
        {userId ? (
          <Button
            type="button"
            onClick={() => {
              authClient.signOut();
            }}
            className="min-h-12 w-full bg-light-700 text-light-500 hover:bg-light-700 dark:bg-dark-400 dark:text-light-500"
          >
            Выйти
          </Button>
        ) : (
          <div className="container space-y-3">
            <Button
              asChild
              className="min-h-12 w-full bg-primary-500 text-light-900 hover:bg-primary-500"
            >
              <Link href="/login">Вход</Link>
            </Button>
            <Button
              asChild
              className="min-h-12 w-full dark:bg-dark-400 dark:text-light-700"
            >
              <Link href="/signup">Регистрация</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
