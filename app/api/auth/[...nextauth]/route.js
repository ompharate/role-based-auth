import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const mockDatabase = [
  {
    id: 1,
    email: "om@gmail.com",
    password: "123",
    role: "user",
  },
  {
    id: 2,
    email: "vaibhav@gmail.com",
    password: "123",
    role: "admin",
  },
];

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);

        // Match user from the mock database
        const user = mockDatabase.find(
          (user) =>
            user.email === credentials?.email &&
            user.password === credentials?.password
        );
        console.log("Authorized user:", user);

        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Return user object, which will be passed to the JWT callback
        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT-based sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback:", { token, user });
      // Add user data to token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback:", { session, token });
      // Attach user data from token to session
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          role: token.role,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
