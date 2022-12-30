import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setPermissionToHideControlsPlayerReducer } from "../../redux/actions";
import { ContextState } from "../../redux/state/context";
import { PlayerState } from "../../redux/state/player";
import { useAppDispatch } from "../../redux/store";

import DefaultPlayer from "../../sections/player/default";

const URL_WEB_SOCKET_STREAM = process.env.NEXT_PUBLIC_WEBSOCKET_STREAM_URL
const URL_API_STREAM = process.env.NEXT_PUBLIC_API_STREAM_URL

export default function Player() {

    const dispatch = useAppDispatch()

    const contextRedux: ContextState = useSelector((state: any) => state.context)
    const playerRedux: PlayerState = useSelector((state: any) => state.player)

    const [uri, setUri] = useState('')

    const [dataBytesRead, setDataBytesRead] = useState(0)
    const [speedDownload, setSpeedDownload] = useState(0)
    const [progressDownload, setProgressDownload] = useState(0)

    const [socketIntervalId, setSocketIntervalId] = useState<any>(null)

    const [fullScreen, setFullScreen] = useState(false)

    var ws: WebSocket;

    useEffect(() => {

        ws?.close()

        setDataBytesRead(0)

        setUri(`${URL_API_STREAM}/torrent/stream?infohash=${playerRedux?.infoHash}&filename=${playerRedux?.fileNameStream?.replace(/ /g, '%20')}` || '')

        startSocketProgress()

    }, [playerRedux.fileNameStream])

    useEffect(() => {
        dispatch(setPermissionToHideControlsPlayerReducer(true))
    }, [])

    const startSocketProgress = () => {

        ws = new WebSocket(`${URL_WEB_SOCKET_STREAM}/torrent/progress`);

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