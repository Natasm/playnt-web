import { Backdrop, CircularProgress } from "@mui/material"
import { useSelector } from "react-redux"
import { GetServerSideProps, NextPage } from "next"
import { unstable_getServerSession } from "next-auth/next"
import Background from "../../sections/auth/signIn/background"
import { FormLogin } from "../../sections/auth/signIn/form"
import { authOptions } from "../api/auth/[...nextauth]"
import AppBarSimple from "../../sections/auth/signIn/appBarSimple"
import { ContextState } from "../../redux/state/context"

import { hasCookie, getCookie } from 'cookies-next'

import jwt_decode from 'jwt-decode'
import { JwtDecodeUserToken } from "../../interfaces/jwt"

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (hasCookie('user-token', { req: context.req })) {
        try {
            var jwt_decoded: JwtDecodeUserToken = jwt_decode(getCookie('user-token', { req: context.req })?.toString() || "")

            if (!jwt_decoded?.id) throw new Error()
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

    const contextRedux: ContextState = useSelector((state: any) => state.context)

    return (
        <Background url="https://www.itl.cat/pngfile/big/22-226927_interstellar-movie.jpg">
            
            <AppBarSimple />

            <FormLogin />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={contextRedux.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Background>
    )
}

export default SignInPage