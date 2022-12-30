import { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, ImageList, ImageListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router'
import { useAppDispatch } from '../../redux/store';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Box } from '@material-ui/core';
import DialogConfirmRemoveUserWatching from './dialog/confirm-remove-user-watching';
import { UserStreamResponse } from '../../services/stream/interface/response.interface';
import { findAllUserStream } from '../../services/stream/user-stream';
import { LoadTorrentRequest } from '../../services/stream/interface/request.interface';
import { setEpisodeIdMediaChoicedReducer, setEpisodeMediaIdChoicedReducer, setFileNameStreamPlayerReducer, setInfoHashPlayerReducer, setMovieMediaIdChoicedReducer, setSeasonIdMediaChoicedReducer, setWatchedTillPlayerReducer } from '../../redux/actions';
import { loadTorrentAction } from '../catalog/redux/actions';
import { removeUserStreamAction } from './redux/actions';
import { Stack } from '@mui/system';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface ContinueWatchingProps {
    userId: number
}

export default function ContinueWatching(props: ContinueWatchingProps) {

    const router = useRouter()

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const dispatch = useAppDispatch()

    const [openModalDelete, setOpenModalDelete] = useState(false)

    const [userStreamIdToDelete, setUserStreamIdToDelete] = useState(0)

    const [userStreamList, setUserStreamList] = useState<UserStreamResponse[]>([])

    const getUserStreamList = async () => {
        const data = await findAllUserStream(Number(props.userId))
        setUserStreamList(data)
    }

    useEffect(() => {
        getUserStreamList()
    }, [])

    const renderMovieItem = (userStream: UserStreamResponse) => {

        const movieName = userStream?.movieMedia?.movie.name
        const movieImagePath = userStream?.movieMedia?.movie.imagePath
        const movieMedia = userStream?.movieMedia

        const play = async () => {

            if (movieMedia) {

                const request: LoadTorrentRequest = {
                    magnet: movieMedia.magnet,
                    movieMediaId: movieMedia.id
                }

                const response = await dispatch(loadTorrentAction(request))

                dispatch(setWatchedTillPlayerReducer(userStream.watchedTill))

                if (response) {
                    dispatch(setMovieMediaIdChoicedReducer(movieMedia.id))

                    dispatch(setInfoHashPlayerReducer(response.infoHash))
                    dispatch(setFileNameStreamPlayerReducer(response.fileName))

                    router.push("/player")
                }
            }

        }

        return (
            <Stack sx={{ backgroundColor: 'black' }}>

                <div style={{ textAlign: 'center', backgroundColor: 'black' }}>
                    <Button onClick={() => {
                        setUserStreamIdToDelete(userStream.id)
                        setOpenModalDelete(true)
                    }} color="error">
                        <DeleteIcon />
                    </Button>
                </div>

                <Box
                    onClick={play}
                    display="flex"
                    key={Math.random()}
                    sx={{
                        padding: 4,
                        height: '100%',
                        backgroundPosition: 'center',
                        borderRadius: 3,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage:
                            `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),` +
                            `url(${movieImagePath || ""})`
                    }}
                    justifyContent="center"
                >
                    <PlayArrowIcon sx={{ color: 'white', paddingTop: 10, fontSize: 80 }} />
                </Box>

                <Stack>
                    <Typography textAlign="center" sx={{ color: 'gray', fontSize: 12 }}>
                        Filme
                    </Typography>
                    <Typography textAlign="center" sx={{ color: 'white', fontSize: 22 }}>
                        {movieName ? movieName : ""}
                    </Typography>
                </Stack>
            </Stack>
        )
    }

    const renderSerieItem = (userStream: UserStreamResponse) => {

        const serieName = userStream?.episode.season.serie.name
        const season = userStream?.episode?.season
        const seasonNumber = userStream?.episode.season.seasonNumber
        const episode = userStream?.episode
        const episodeNumber = userStream?.episode.episodeNumber
        const episodeMedia = userStream?.episodeMedia
        const serieImagePath = userStream?.episode.season.serie.imagePath

        const play = async () => {

            if (episodeMedia && episodeNumber) {

                const request: LoadTorrentRequest = {
                    magnet: episodeMedia.magnet,
                    episodeMediaId: episodeMedia.id,
                    episodeNumber: episodeNumber
                }

                const response = await dispatch(loadTorrentAction(request))

                dispatch(setWatchedTillPlayerReducer(userStream.watchedTill))

                if (response) {

                    dispatch(setEpisodeMediaIdChoicedReducer(episodeMedia.id))
                    dispatch(setEpisodeIdMediaChoicedReducer(episode.id))
                    dispatch(setSeasonIdMediaChoicedReducer(season.id))

                    dispatch(setInfoHashPlayerReducer(response.infoHash))
                    dispatch(setFileNameStreamPlayerReducer(response.fileName))

                    router.push("/player")
                }
            }

        }

        return (
            <Stack sx={{ backgroundColor: 'black' }}>

                <div style={{ textAlign: 'center', backgroundColor: 'black' }}>
                    <Button onClick={() => {
                        setUserStreamIdToDelete(userStream.id)
                        setOpenModalDelete(true)
                    }} color="error">
                        <DeleteIcon />
                    </Button>
                </div>

                <Box
                    onClick={play}
                    display="flex"
                    key={Math.random()}
                    sx={{
                        padding: 4,
                        height: '100%',
                        backgroundPosition: 'center',
                        borderRadius: 3,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage:
                            `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),` +
                            `url(${serieImagePath || ""})`
                    }}
                    justifyContent="center"
                >
                    <PlayArrowIcon sx={{ color: 'white', paddingTop: 10, fontSize: 80 }} />
                </Box>

                <Stack>
                    <Typography textAlign="center" sx={{ color: 'gray', fontSize: 15 }}>
                        {serieName || ""}
                    </Typography>

                    <Typography textAlign="center" sx={{ color: 'gray', fontSize: 12 }}>
                        {seasonNumber ? `${seasonNumber}ª Temporada` : ""}
                    </Typography>

                    <Typography textAlign="center" sx={{ color: 'white', fontSize: 22 }}>
                        {episodeNumber ? `Episódio ${episodeNumber}` : ""}
                    </Typography>
                </Stack>
            </Stack>
        )

    }

    const removeUserStream = async () => {

        const response = await dispatch(removeUserStreamAction(Number(userStreamIdToDelete)))

        if (response) {
            getUserStreamList()
        }

        setOpenModalDelete(false)
    }

    return (
        <Box style={{ padding: 20 }}>

            <DialogConfirmRemoveUserWatching
                open={openModalDelete}
                onClose={() => setOpenModalDelete(false)}
                onAction={removeUserStream}
            />

            {
                userStreamList?.length > 0 &&
                <h2
                    style={{
                        fontWeight: 200,
                        letterSpacing: '.2rem',
                        color: 'white',
                        textDecoration: 'none',
                    }}
                >
                    Continue Assistindo
                </h2>
            }

            <ImageList cols={matches ? 6 : 2} gap={8}>
                {
                    userStreamList?.map((item: UserStreamResponse) => {
                        if (item?.movieMedia) return renderMovieItem(item)
                        if (item?.episodeMedia) return renderSerieItem(item)
                    })
                }
            </ImageList>
        </Box>
    )
};