import { useEffect } from 'react';
import { Backdrop, CircularProgress } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { useSelector } from "react-redux";
import { ContextState } from "../../redux/state/context";
import AppBarCustom from "../../sections/catalog/appBar";
import Background from "../../sections/catalog/background";
import CatalogList from "../../sections/catalog/list";
import { authOptions } from "../api/auth/[...nextauth]";

import Head from 'next/head'

import { hasCookie, getCookie } from 'cookies-next'
import jwt_decode from 'jwt-decode'
import { JwtDecodeUserToken } from "../../interfaces/jwt";
import { useDispatch } from "react-redux";
import { resetPlayerReducer, setUserIdReducer } from "../../redux/actions";

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

interface CatalogProps {
    userId: number
}

const CatalogPage: NextPage<CatalogProps> = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUserIdReducer(Number(props.userId)))

        dispatch(resetPlayerReducer())
    }, [])

    const contextRedux: ContextState = useSelector((state: any) => state.context)

    return (
        <>
            <Head>
                <title>Playnt - Catálogo</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Background url="https://www.itl.cat/pngfile/big/22-226927_interstellar-movie.jpg">

                <AppBarCustom />

                <div style={{ paddingTop: 100 }}>
                    <CatalogList />
                </div>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={contextRedux.loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

            </Background>
        </>
    )
}

export default CatalogPage