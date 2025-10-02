import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Yandex from "next-auth/providers/yandex";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    GitHub,
    Yandex,
    Credentials({
      credentials: {
        name: {label: "Name"},
        email: {label: "Email"},
        password: {label: "Password"},
      }
    })
  ],
} satisfies NextAuthConfig;
