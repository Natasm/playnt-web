import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            id: "signIn",
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'SignIn Playnt',
            // The credentials property is used to generate a suitable form on the sign in page.
            credentials: {},
            async authorize(credentials: any, req) {
                try {
                    const user = { id: credentials?.login, email: credentials?.login }
                    return user;
                } catch (e) {
                    console.log(e)
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: "/auth/signIn",
    },
}

export default NextAuth(authOptions)