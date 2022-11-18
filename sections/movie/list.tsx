import { useEffect } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, ImageList, ImageListItem, Typography } from '@mui/material';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import { loadMediaBySearch, loadMedia, postMovieWebScraperAction } from '../../redux/action/movie';
import {
    clearMedia, clearPage, setFilesOfMediaChoiced, setHasMoreItems, setLoadingGlobal, setRouteActionTriggered, setScrollTopPosition
} from '../../redux/actions';
import store, { useAppDispatch } from '../../redux/store';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MovieWebScraper, SerieWebScraper } from '../../services/catalog/interface/webscraper.interface';
import { postSerieWebScraperAction } from '../../redux/action/serie';

export default function MovieList() {

    const router = useRouter()

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const dispatch = useAppDispatch()

    const contextRedux = useSelector((state: any) => state.context)
    const mediaState = useSelector((state: any) => state.media)
    const scrollTopPosition = useSelector((state: any) => state.scrollGlobal.scrollTopPosition)
    const searchGlobal = useSelector((state: any) => state.searchGlobal)

    useEffect(() => {
        
        if (contextRedux.routeActionTriggered !== 'POP') {
            dispatch(clearPage())
            dispatch(clearMedia())

            dispatch(setScrollTopPosition(0))

            dispatch(setHasMoreItems(true))

            dispatch(setFilesOfMediaChoiced([]))

            dispatch(loadMedia())
        }

        const trackScrolling = () => {
            if (document.documentElement.offsetHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
                if (store.getState().loadingGlobal.loading) return
                
                if (store.getState().scrollGlobal.scrollTopPosition > document.documentElement.scrollHeight) return

                if (searchGlobal.search !== '') {
                    dispatch(loadMediaBySearch(searchGlobal.search))
                } else {
                    dispatch(loadMedia())
                }
            }
        }

        document.addEventListener('scroll', trackScrolling);

        return () => {
            document.removeEventListener('scroll', trackScrolling);
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        document.body.scrollTop = scrollTopPosition
        document.documentElement.scrollTop = scrollTopPosition

    }, [scrollTopPosition])

    useEffect(() => {
        if (searchGlobal.search !== '') {
            dispatch(clearPage())
            dispatch(clearMedia())

            dispatch(setHasMoreItems(true))

            dispatch(loadMediaBySearch(searchGlobal.search))
        }

    }, [searchGlobal.search])

    const renderMovieItem = (movie: MovieWebScraper) => {

        const onPress = async () => {

            dispatch(setLoadingGlobal(true))

            dispatch(setScrollTopPosition(document.body.scrollTop || document.documentElement.scrollTop))

            dispatch(setRouteActionTriggered("PUSH"))

            try {
                dispatch(postMovieWebScraperAction(movie))

                router.push('/movie/info')

            } catch (err) {
                console.log(err)
            } finally {
                dispatch(setLoadingGlobal(false))
            }
        }

        return (
            <ImageListItem key={movie.imagePath + Math.random()}>
                <Card sx={{ height: '100%' }}>
                    <CardMedia
                        component="img"
                        image={movie.imagePath || ''}
                        alt=""
                    />
                    <CardContent>
                        <Typography style={{ wordWrap: "break-word" }} gutterBottom variant="h6" component="div">
                            {movie.name || ''}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={onPress}>Escolho esse</Button>
                    </CardActions>
                </Card>
            </ImageListItem>
        )
    }

    const renderSerieItem = (serie: SerieWebScraper) => {

        const onPress = async () => {

            dispatch(setScrollTopPosition(document.body.scrollTop || document.documentElement.scrollTop))

            dispatch(setRouteActionTriggered("PUSH"))

            try {
                dispatch(postSerieWebScraperAction(serie))

                router.push('/movie/infoSerie')

            } catch (err) {
                console.log(err)
            }
        }

        return (
            <ImageListItem key={serie.imagePath + Math.random()}>
                <Card sx={{ height: '100%' }}>
                    <CardMedia
                        component="img"
                        image={serie.imagePath || ''}
                        alt=""
                    />
                    <CardContent>
                        <Typography style={{ wordWrap: "break-word" }} gutterBottom variant="h6" component="div">
                            {`${serie.name} - ${serie?.seasons[0]?.seasonNumber || 0}ª Temporada` || ''}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={onPress}>Escolho esse</Button>
                    </CardActions>
                </Card>
            </ImageListItem>
        )
    }

    return (
        <ImageList cols={matches ? 6 : 2 } gap={8} sx={{ padding: 1 }}>
            {
                mediaState.media?.map((item: any) => {
                    if (item?.movie) return renderMovieItem(item.movie)
                    if (item?.serie) return renderSerieItem(item.serie)
                })
            }
        </ImageList>
    )
};