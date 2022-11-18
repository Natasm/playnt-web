import { Backdrop, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

import videojs from 'video.js';
import { setFilesSubtitleChoicedRedux } from "../../../redux/actions";
import store, { useAppDispatch } from "../../../redux/store";
import { downloadSubtitle } from "../../../services/subtitle";

import ControlsPlayer from "../controls";
import InfoStream from "../information/infoStream";

import 'react-toastify/dist/ReactToastify.css';
import { postUserStream } from "../../../services/catalog";

interface Props {
    uri: string,
    speedDownload: number,
    progressDownload: number
}

export default function DefaultPlayer(props: Props) {

    const dispatch = useAppDispatch()

    const [videoNode, setVideoNode] = useState<HTMLVideoElement>()
    const [player, setPlayer] = useState<videojs.Player>()

    const [pause, setPause] = useState(false)
    const [timePosition, setTimePosition] = useState(0)
    const [duration, setDuration] = useState(0)
    const [cacheBufferingState, setCacheBufferingState] = useState(0)
    const [mutedAudio, setMutedAudio] = useState(true)

    const [tracks, setTracks] = useState({})

    const [selectedAudio, setSelectedAudio] = useState('1')
    const [selectedSubtitle, setSelectedSubtitle] = useState('-1')

    const playerRedux = useSelector((state: any) => state.player)
    const subtitleRedux = useSelector((state: any) => state.subtitle)

    useEffect(() => {
        dispatch(setFilesSubtitleChoicedRedux([]))
    }, [])

    useEffect(() => {
        if (videoNode) {

            const videoJsOptions = {
                autoplay: true,
                controls: false,
                children: ['mediaLoader', 'textTrackDisplay']
            }

            setPlayer(videojs(videoNode, videoJsOptions, function onPlayerReady() { }))

            document.addEventListener("keydown", handleKeyDown)
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [videoNode])

    useEffect(() => {
        if (player) {

            player.on('timeupdate', () => {
                if (player) {
                    setTimePosition(player.currentTime() | 0)
                }
            })

            player.on('waiting', () => {
                setCacheBufferingState(0)
            })

            player.on('playing', async () => {

                setDuration(player.duration())

                setCacheBufferingState(100)

                if (player) {
                    var tracksReceived = []

                    for (var i = 0; i < player.audioTracks().length; i++) {
                        tracksReceived.push(player.audioTracks()[i])
                    }

                    for (var i = 0; i < player.textTracks().length; i++) {
                        tracksReceived.push(player.textTracks()[i])
                    }

                    setTracks(tracksReceived)
                }
            })

            setSelectedAudio('2')
        }
    }, [player])

    const handleSeek = (value: any) => {
        setTimePosition(value)

        if (player) {
            player.currentTime(value)
        }
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Space' || e.key === ' ') {
            if (store.getState().player.permissionToHideControls) handlePlayPause()
        }
    }

    const handlePlayPause = () => {
        if (videoNode) {
            if (videoNode.paused) {
                setPause(false)
                videoNode?.play()
            } else {
                setPause(true)
                videoNode?.pause()
            }
        }
    }

    const mutedAudioChange = () => {
        if (player) {
            if (mutedAudio) {
                setMutedAudio(false)
                player.muted(false)
            } else {
                setMutedAudio(true)
                player.muted(true)
            }
        }
    }

    const audioChange = (e: any) => {
        const value = e.target.value;

        setSelectedAudio(value)
    }

    useEffect(() => {
        if (player) {
            var tracks = player.audioTracks()
            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i]
                if (track.id == selectedAudio) {
                    track.enabled = true
                } else {
                    track.enabled = false
                }
            }
            handleSeek(timePosition)
        }
    }, [selectedAudio])

    const subtitleChange = (e: any) => {
        const value = e.target.value;

        setSelectedSubtitle(value)
    }

    useEffect(() => {
        if (player) {
            var tracks = player.textTracks()
            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i]
                if (track.id == selectedSubtitle) {
                    track.mode = "showing"
                } else {
                    track.mode = "disabled"
                }
            }
        }
    }, [selectedSubtitle])

    useEffect(() => {

        const addTextTracksToPlayer = async () => {
            if (!player || subtitleRedux.filesSubtitleChoiced.length <= 0) return

            var filesSubtitlesLoadedCount = 0

            var remainingDownload = 0
            var err = false

            for await (var fileSubtitle of subtitleRedux.filesSubtitleChoiced) {
                try {
                    const response = await downloadSubtitle(fileSubtitle.id, 'webvtt')

                    if (response.data) {
                        remainingDownload = response.data.remaining
                        player.addRemoteTextTrack({ src: response.data.link }, false);

                        filesSubtitlesLoadedCount += 1
                    }
                } catch (error) {
                    err = true
                }
            }

            if (err) {
                toast.error("Houve um erro em algumas legendas")
                toast.success("Quantidade de Legendas com sucesso: " + filesSubtitlesLoadedCount)
            }

            toast.info("Cota restante de download de legendas: " + (remainingDownload || ''))

            player.trigger('playing')
        }

        addTextTracksToPlayer()
    }, [subtitleRedux.filesSubtitleChoiced, player])

    useEffect(() => {
        if (!playerRedux.permissionToHideControls) {
            setPause(true)
            videoNode?.pause()
        }
    }, [playerRedux.permissionToHideControls])

    const [mouseMove, setMouseMove] = useState(true)

    var time: any = null;

    const handleMouseMove = () => {
        setMouseMove(true)

        clearTimeout(time)

        time = setTimeout(() => {
            if (store.getState().player.permissionToHideControls) setMouseMove(false)
        }, 5000)
    }

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            if (time) clearTimeout(time)
        }
    }, [])

    var intervalUpdateUserStream: any;

    useEffect(() => {

        intervalUpdateUserStream = setInterval(
            postUserStream({}), 60000
        )

        return () => {
            clearInterval(intervalUpdateUserStream)
        }
    }, [])

    return (
        <div>
            <video
                id='video'
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden'
                }}
                autoPlay
                muted
                src={props.uri}
                ref={(node: HTMLVideoElement) => setVideoNode(node)}
            />

            <Backdrop sx={{ color: '#fff' }} open={cacheBufferingState != 100}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {
                mouseMove &&

                <div>
                    <Backdrop sx={{ color: '#fff' }} open={true} />

                    <InfoStream
                        speedDownload={props.speedDownload}
                        progressDownload={props.progressDownload}
                    />

                    <div style={{ paddingTop: '65vh' }}>
                        <ControlsPlayer
                            duration={duration}
                            timePosition={timePosition}
                            handleSeek={handleSeek}

                            handlePlayPause={handlePlayPause}
                            pause={pause}

                            audioTracks={tracks}
                            selectedAudio={selectedAudio}
                            audioChange={audioChange}

                            subtitleTracks={tracks}
                            selectedSubtitle={selectedSubtitle}
                            subtitleChange={subtitleChange}

                            mutedAudio={mutedAudio}
                            mutedAudioChange={mutedAudioChange}
                        />
                    </div>

                </div>
            }

            <ToastContainer />
        </div>
    );
}