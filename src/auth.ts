import { redirect } from "next/navigation";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/",
  },
});

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  return { session, user: session.user };
}
