import { Backdrop, CircularProgress } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DefaultPlayer from "../../sections/player/default";
import { authOptions } from "../api/auth/[...nextauth]";

const URL_WEB_SOCKET_STREAM = process.env.NEXT_PUBLIC_WEB_SOCKET_STREAM

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (session) {
        return {
            props: {}
        }
    }

    return {
        redirect: {
            destination: '/auth/signin',
            permanent: false,
        },
    }
}

const Player: NextPage = () => {

    const torrent = useSelector((state: any) => state.torrent)
    const offline = useSelector((state: any) => state.offline)
    const loadingGlobal = useSelector((state: any) => state.loadingGlobal)

    const [uri, setUri] = useState('')

    const [dataBytesRead, setDataBytesRead] = useState(0)
    const [speedDownload, setSpeedDownload] = useState(0)
    const [progressDownload, setProgressDownload] = useState(0)

    const [socketIntervalId, setSocketIntervalId] = useState<any>(null)

    const [fullScreen, setFullScreen] = useState(false)

    useEffect(() => {

        setUri(torrent.uriStreamFile)

        console.log(torrent.uriStreamFile)

        if (!offline.isMediaOffline) {
            startSocketProgress()
        }

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
            if (ws.readyState === WebSocket.OPEN && torrent.infoHash) {
                ws.send(JSON.stringify({
                    infohash: torrent.infoHash,
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
                open={loadingGlobal.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Player