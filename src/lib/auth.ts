import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from "@/lib/db"
import { Admin } from "@/models/admin"
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }
        await connectDB()
        const admin = await Admin.findOne({ username: credentials.username })
        if (admin && admin.password === credentials.password) {
          return { id: admin._id, email: admin.email, role: admin.role }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: import("next-auth").Session; token: any }) {
      (session as any).role = token.role
      return session
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
  },
  pages: {
    signIn: "/admin/dashboard",
  },
   secret: process.env.NEXTAUTH_SECRET,
}