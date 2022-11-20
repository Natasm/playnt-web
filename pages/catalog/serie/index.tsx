import { Backdrop, CircularProgress } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ContextState } from "../../../redux/state/context";
import { SerieChoicedState } from "../../../redux/state/serieChoiced";
import AppBarMovieSimple from "../../../sections/catalog/appBarSimple";
import Background from "../../../sections/catalog/background";
import SerieTitle from "../../../sections/catalog/serie/title";
import { authOptions } from "../../api/auth/[...nextauth]";

import { hasCookie, getCookie } from 'cookies-next'
import jwt_decode from 'jwt-decode'
import { JwtDecodeUserToken } from "../../../interfaces/jwt";
import { useDispatch } from "react-redux";
import { resetPlayerReducer, setUserIdReducer } from "../../../redux/actions";

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (session && hasCookie('user-token', { req: context.req })) {
        try {
            var jwt_decoded: JwtDecodeUserToken = jwt_decode(getCookie('user-token', { req: context.req })?.toString() || "")

            if (jwt_decoded?.id) {
                return {
                    props: {
                        userId: jwt_decoded.id
                    }
                }
            }
        } catch (e) { }
    }

    return {
        redirect: {
            destination: '/auth/signIn',
            permanent: false,
        },
    }
}

interface SerieTitleProps {
    userId: number
}

const SerieTitlePage: NextPage<SerieTitleProps> = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUserIdReducer(Number(props.userId)))

        dispatch(resetPlayerReducer())
    }, [])

    const contextRedux: ContextState = useSelector((state: any) => state.context)
    const serieChoicedRedux: SerieChoicedState = useSelector((state: any) => state.serieChoiced)

    useEffect(() => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }, [])

    return (
        <Background url={serieChoicedRedux?.serie?.imagePath || "https://www.itl.cat/pngfile/big/22-226927_interstellar-movie.jpg"}>
            <AppBarMovieSimple />

            <div style={{ paddingTop: 100 }}>
                <SerieTitle />
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={contextRedux.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

        </Background>
    )
}

export default SerieTitlePage