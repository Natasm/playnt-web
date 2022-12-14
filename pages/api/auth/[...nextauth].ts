import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from '../../../services/auth';

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
                    const response = await login(credentials?.login, credentials?.password)

                    const user = { id: credentials?.login }

                    if (response?.data?.auth) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (e) {
                    throw new Error("There was an error on user authentication");
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/signin",
    },
}

export default NextAuth(authOptions)