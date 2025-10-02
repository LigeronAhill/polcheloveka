import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
import authConfig from "./auth.config";
import client from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  ...authConfig,
});
