import { useEffect } from 'react'
import { Backdrop, CircularProgress } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { useSelector } from "react-redux"
import AppBarSimple from "../../sections/downloaded/appBarSimple"
import Background from "../../sections/downloaded/background"
import TorrentsDownloadedList from "../../sections/downloaded/list"
import { authOptions } from "../api/auth/[...nextauth]"

import { hasCookie, getCookie } from 'cookies-next'
import jwt_decode from 'jwt-decode'
import { JwtDecodeUserToken } from "../../interfaces/jwt"
import { useDispatch } from "react-redux"
import { setUserIdReducer } from "../../redux/actions"

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
            destination: '/auth/signin',
            permanent: false,
        },
    }
}

interface DownloadedTorrentProps {
    userId: number
}

const DownloadedTorrent: NextPage<DownloadedTorrentProps> = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUserIdReducer(Number(props.userId)))
    }, [])

    const loadingGlobal = useSelector((state: any) => state.loadingGlobal)

    return (
        <Background url="https://www.itl.cat/pngfile/big/22-226927_interstellar-movie.jpg">
            <AppBarSimple />

            <div style={{ paddingTop: 100 }}>
                <TorrentsDownloadedList />
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingGlobal.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

        </Background>
    )
}

export default DownloadedTorrent