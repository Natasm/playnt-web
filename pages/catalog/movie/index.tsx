import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { useEffect } from "react";
import MovieTitle from "../../../sections/catalog/movie/title";
import { authOptions } from "../../api/auth/[...nextauth]";

import Head from 'next/head';

import { hasCookie, getCookie, deleteCookie } from 'cookies-next'
import jwt_decode from 'jwt-decode'
import { JwtDecodeUserToken } from "../../../interfaces/jwt";
import { useDispatch } from "react-redux";
import { resetPlayerReducer, setUserIdReducer } from "../../../redux/actions";
import { findUserByCustomerId } from "../../../services/stream/user";

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (session && hasCookie('user-token', { req: context.req })) {

        try {

            var jwt_decoded: JwtDecodeUserToken = jwt_decode(getCookie('user-token', { req: context.req })?.toString() || "")

            if (jwt_decoded?.customerId) {

                const user = await findUserByCustomerId(Number(jwt_decoded?.customerId))

                return {
                    props: {
                        userId: user.id,
                        customerId: user.customerId
                    }
                }

            }
        } catch (e) {
            deleteCookie('user-token', { req: context.req, res: context.res })
        }
    }

    return {
        redirect: {
            destination: '/auth/signIn',
            permanent: false,
        },
    }
}

interface MovieTitleProps {
    userId: number
}

const MovieTitlePage: NextPage<MovieTitleProps> = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUserIdReducer(Number(props.userId)))

        dispatch(resetPlayerReducer())
    }, [])

    useEffect(() => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }, [])

    return (
        <>
            <Head>
                <title>Playnt - Filme</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <MovieTitle />
        </>
    )
}

export default MovieTitlePage