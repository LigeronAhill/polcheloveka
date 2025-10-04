import LeftSidebar from "@/components/shared/leftSidebar";
import Navbar from "@/components/shared/navbar/navbar";
import RightSidebar from "@/components/shared/rightSidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative bg-light-850 text-dark-100 dark:bg-dark-100 dark:text-light-850">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pt-36 pb-6 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
      Toaster
    </main>
  );
}
