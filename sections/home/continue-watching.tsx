import { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, ImageList, ImageListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router'
import { useAppDispatch } from '../../redux/store';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { getUserStreamWatching } from '../../services/catalog';
import { UserStreamWatchingResponse } from '../../services/catalog/interface/response.interface';
import { Box } from '@material-ui/core';
import { setFileNameStreamPlayerReducer, setMovieChoicedReducer, setSerieChoicedReducer, setTitleTypePlayerReducer, setWatchedTillPlayerReducer } from '../../redux/actions';
import { PlayerTitleType } from '../../redux/state/player';
import { postTorrentAction } from '../catalog/redux/actions';
import DialogConfirmRemoveUserWatching from './dialog/confirm-remove-user-watching';
import { removeUserWatchingAction } from './redux/actions';

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

    const [watchingList, setWatchingList] = useState<UserStreamWatchingResponse[]>([])

    const getWatchingList = async () => {
        const data = await getUserStreamWatching(Number(props.userId))
        setWatchingList(data)
    }

    useEffect(() => {
        getWatchingList()
    }, [])

    const renderMovieItem = (watching: UserStreamWatchingResponse) => {

        const onPress = async () => {

            if (watching?.watchingMovie?.media[0]?.id && watching?.watchingMovie?.media[0]?.magnet) {

                dispatch(setMovieChoicedReducer(watching.watchingMovie))

                dispatch(setTitleTypePlayerReducer(PlayerTitleType.MOVIE))
                dispatch(setWatchedTillPlayerReducer(watching.watchedTill))
                dispatch(setFileNameStreamPlayerReducer(watching.watchingMovie.media[0].files[0].name))

                try {
                    await dispatch(postTorrentAction({
                        magnet: watching.watchingMovie?.media[0].magnet,
                        media_id: Number(watching.watchingMovie?.media[0].id)
                    }))

                    router.push('/player')

                } catch (error) { console.log(error) }
            }
        }

        return (
            <ImageListItem key={Math.random()}>

                <div style={{ textAlign: 'center', backgroundColor: 'black' }}>
                    <Button onClick={() => {
                        setUserStreamIdToDelete(watching.id)
                        setOpenModalDelete(true)
                    }} color="error">
                        <DeleteIcon />
                    </Button>
                </div>

                <Card sx={{ height: '100%' }}>
                    <CardMedia
                        component="img"
                        image={watching?.watchingMovie?.imagePath || ''}
                        alt=""
                    />
                    <CardContent>
                        <Typography style={{ wordWrap: "break-word" }} gutterBottom variant="h6" component="div">
                            {watching?.watchingMovie?.name || ''}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={onPress}>Escolho esse</Button>
                    </CardActions>
                </Card>
            </ImageListItem>
        )
    }

    const renderSerieItem = (watching: UserStreamWatchingResponse) => {

        const onPress = async () => {

            if (
                watching?.watchingSerie?.seasons[0]?.episodes[0]?.media[0]?.id &&
                watching?.watchingSerie?.seasons[0]?.episodes[0]?.media[0]?.magnet
            ) {

                dispatch(setSerieChoicedReducer(watching.watchingSerie))

                dispatch(setTitleTypePlayerReducer(PlayerTitleType.SERIE))
                dispatch(setWatchedTillPlayerReducer(watching.watchedTill))
                dispatch(setFileNameStreamPlayerReducer(
                    watching?.watchingSerie?.seasons[0]?.episodes[0]?.media[0].files[0].name
                ))

                try {
                    await dispatch(postTorrentAction({
                        magnet: watching?.watchingSerie?.seasons[0]?.episodes[0]?.media[0]?.magnet,
                        media_id: Number(watching?.watchingSerie?.seasons[0]?.episodes[0]?.media[0]?.id)
                    }))

                    router.push('/player')

                } catch (error) { console.log(error) }
            }
        }


        return (
            <ImageListItem key={Math.random()}>
                <Card sx={{ height: '100%' }}>

                    <div style={{ textAlign: 'center', backgroundColor: 'black' }}>
                        <Button onClick={() => {
                            setUserStreamIdToDelete(watching.id)
                            setOpenModalDelete(true)
                        }} color="error">
                            <DeleteIcon />
                        </Button>
                    </div>

                    <CardMedia
                        component="img"
                        image={watching?.watchingSerie?.imagePath || ''}
                        alt=""
                    />
                    <CardContent>
                        <Typography style={{ wordWrap: "break-word" }} gutterBottom variant="h6" component="div">
                            {`${watching?.watchingSerie?.name} - ${watching.watchingSerie?.seasons[0].seasonNumber || 0}ª Temporada` || ''}
                        </Typography>

                        <Typography style={{ wordWrap: "break-word", color: 'gray' }} gutterBottom variant="h6" component="div">
                            {`Episódio: ${watching.watchingSerie?.seasons[0].episodes[0].episodeNumberRange}` || ''}
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={onPress}>Escolho esse</Button>
                    </CardActions>
                </Card>
            </ImageListItem>
        )
    }

    const removeWatching = async () => {
        const response = await dispatch(removeUserWatchingAction(Number(userStreamIdToDelete)))
    
        if (response) {
            getWatchingList()
        }

        setOpenModalDelete(false)
    }

    return (
        <Box style={{ padding: 20 }}>

            <DialogConfirmRemoveUserWatching
                open={openModalDelete}
                onClose={() => setOpenModalDelete(false)}
                onAction={removeWatching}
            />

            {
                watchingList?.length > 0 &&
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
                    watchingList?.map((item: UserStreamWatchingResponse) => {
                        if (item?.watchingMovie) return renderMovieItem(item)
                        if (item?.watchingSerie) return renderSerieItem(item)
                    })
                }
            </ImageList>
        </Box>
    )
};