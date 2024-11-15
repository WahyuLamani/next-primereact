import { prisma } from "@/lib/utils";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: { label: "Password", type: "password" },
            },
            authorize: async (
                credentials
            ): Promise<{ id: string; name: string; email: string } | null> => {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Please enter email and password");
                }

                // Cari pengguna berdasarkan email
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) throw new Error("No user found");

                // Verifikasi password
                const isValidPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!isValidPassword) throw new Error("Incorrect password");

                // Kembalikan user jika login sukses
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
    pages: {
        signIn: "/login",
        signOut: "/logout",
    },
    secret: process.env.NEXTAUTH_SECRET || "adsaodadosakd123123239",
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user = {
                    ...session.user,
                    id: token.id as string,
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
