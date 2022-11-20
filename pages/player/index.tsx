import { Backdrop, CircularProgress } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ContextState } from "../../redux/state/context";
import { MediaState } from "../../redux/state/media";
import { PlayerState } from "../../redux/state/player";
import DefaultPlayer from "../../sections/player/default";
import { authOptions } from "../api/auth/[...nextauth]";

import { hasCookie, getCookie } from 'cookies-next'
import jwt_decode from 'jwt-decode'
import { JwtDecodeUserToken } from "../../interfaces/jwt";
import { useDispatch } from "react-redux";
import { setUserIdReducer } from "../../redux/actions";

const URL_WEB_SOCKET_STREAM = process.env.NEXT_PUBLIC_WEB_SOCKET_STREAM

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

interface PlayerProps {
    userId: number
}

const URL_API_STREAM = process.env.NEXT_PUBLIC_URL_API_STREAM

const PlayerPage: NextPage<PlayerProps> = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUserIdReducer(Number(props.userId)))
    }, [])

    const contextRedux: ContextState = useSelector((state: any) => state.context)
    const playerRedux: PlayerState = useSelector((state: any) => state.player)

    const [uri, setUri] = useState('')

    const [dataBytesRead, setDataBytesRead] = useState(0)
    const [speedDownload, setSpeedDownload] = useState(0)
    const [progressDownload, setProgressDownload] = useState(0)

    const [socketIntervalId, setSocketIntervalId] = useState<any>(null)

    const [fullScreen, setFullScreen] = useState(false)

    useEffect(() => {

        setUri(`${URL_API_STREAM}/torrent/stream?infohash=${playerRedux?.infoHash}&filename=${playerRedux?.fileNameStream?.replace(/ /g, '%20')}` || '')

        startSocketProgress()

    }, [])

    const startSocketProgress = () => {

        var ws = new WebSocket(`${URL_WEB_SOCKET_STREAM}/torrent/progress`);

        ws.onmessage = (event) => {
            const obj = JSON.parse(event.data);

            try {
                if (obj) {

                    if (obj.progressDownload === 1) {
                        ws?.close();
                        clearInterval(socketIntervalId)
                    }

                    setDataBytesRead((prev) => {
                        setSpeedDownload(obj.dataBytesRead - prev)
                        return obj.dataBytesRead
                    })

                    setProgressDownload(obj.progressDownload)
                }
            } catch (err) {
                console.log(err);
            }
        }

        setSocketIntervalId(setInterval(() => {
            if (ws.readyState === WebSocket.OPEN && playerRedux.infoHash) {
                ws.send(JSON.stringify({
                    infohash: playerRedux.infoHash,
                }));
            }
        }, 2000))
    }

    const toggleFullscreen = () => {

        if (fullScreen) {
            document.exitFullscreen();
        } else {
            document.body.requestFullscreen();
        }

        setFullScreen(!fullScreen)
    }

    return (
        <div onDoubleClick={toggleFullscreen}>
            {
                <DefaultPlayer
                    uri={uri}
                    speedDownload={speedDownload}
                    progressDownload={progressDownload}
                />
            }
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
                open={contextRedux.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default PlayerPage