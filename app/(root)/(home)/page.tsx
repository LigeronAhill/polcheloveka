import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Home(): React.JSX.Element {
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <div>Home</div>
    </div>
  );
}
