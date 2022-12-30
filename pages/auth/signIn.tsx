import { GetServerSideProps, NextPage } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"

import Head from 'next/head'

import { hasCookie, getCookie } from 'cookies-next'

import jwt_decode from 'jwt-decode'
import { JwtDecodeUserToken } from "../../interfaces/jwt"
import SignIn from "../../sections/auth/signIn"

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (hasCookie('user-token', { req: context.req })) {
        try {
            var jwt_decoded: JwtDecodeUserToken = jwt_decode(getCookie('user-token', { req: context.req })?.toString() || "")

            if (!jwt_decoded?.customerId) throw new Error()
        } catch (e) {
            return {
                props: {}
            }
        }
    }

    if (!session || !hasCookie('user-token', { req: context.req })) {
        return {
            props: {}
        }
    }

    return {
        redirect: {
            destination: '/home',
            permanent: false,
        },
        props: {},
    };

}

const SignInPage: NextPage = () => {

    return (
        <>
            <Head>
                <title>Playnt - Autenticação</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <SignIn />
        </>
    )
}

export default SignInPage
