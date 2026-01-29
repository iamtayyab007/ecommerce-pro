import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./db";
import { User } from "@/models/User";
import { inngest } from "@/app/inngest/client";

export const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("User not found");
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValid) {
          throw new Error("password incorrect");
        }
        return {
          id: user._id.toString(),
          email: user.email,
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
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      return session;
    },
  },

  events: {
    signIn: async ({ user, isNewUser }) => {
      console.log("🔥 EVENT FIRED BEFORE INNGEST");

      const res = await inngest.send({
        name: "user/created",
        data: {
          userId: user.id,
          email: user.email,
        },
      });

      console.log("🔥 INNGEST SEND RESULT", res);
    },
  },

  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
