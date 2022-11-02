import { Backdrop, CircularProgress } from "@mui/material"
import { useSelector } from "react-redux"
import { GetServerSideProps, NextPage } from "next"
import { unstable_getServerSession } from "next-auth/next"
import AppBarSimple from "../../sections/auth/appBarSimple"
import Background from "../../sections/auth/background"
import { FormLogin } from "../../sections/auth/login/form"
import { authOptions } from "../api/auth/[...nextauth]"

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return {
            props: {}
        };
    }

    return {
        redirect: {
            destination: '/home',
            permanent: false,
        },
        props: {},
    };

}

const SignIn: NextPage = () => {

    const loadingGlobal = useSelector((state: any) => state.loadingGlobal)

    return (
        <Background url="https://www.itl.cat/pngfile/big/22-226927_interstellar-movie.jpg">
            <AppBarSimple />

            <FormLogin />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingGlobal.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Background>
    )
}

export default SignIn