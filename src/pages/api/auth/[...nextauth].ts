import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWIITER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
});
