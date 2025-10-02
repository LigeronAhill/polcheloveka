// import { signOut } from "@/auth";

// export function SignOutButton() {
//   return (
//     <form
//       action={async () => {
//         "use server";
//         await signOut();
//       }}
//     >
//       <button type="submit">Sign Out</button>
//     </form>
//   );
// }
"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}
