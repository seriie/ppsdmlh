import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { User } from "next-auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      authorize: async (
        credentials: Record<"email" | "password", string> | undefined,
        req
      ): Promise<User | null> => {
        const user = await prisma.users.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) return null;

        const validPw = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!validPw) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.fullname,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fullname = user.fullname;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.fullname = token.fullname;
      session.user.role = token.role;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
