import { auth } from "@/auth";
import { SignInButton } from "@/components/auth/sign-in";
import { SignOutButton } from "@/components/auth/sign-out";

export default function Home(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <SignInButton />
      <SignOutButton />
      Home
      <Dashboard />
    </div>
  );
}

async function Dashboard() {
  const session = await auth();
  if (!session) {
    return <div>No session</div>;
  }
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
