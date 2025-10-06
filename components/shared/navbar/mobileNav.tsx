"use client";
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
import { authClient } from "@/lib/auth-client";

export default function MobileNav(): React.JSX.Element {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
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
          <NavContent userId={userId} />
        </SheetClose>
        <div className="flex flex-col gap-3 px-4 pb-6">
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
            <>
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
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
function NavContent({ userId }: { userId?: string }): React.JSX.Element {
  const pathname = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 px-4 pt-16">
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
