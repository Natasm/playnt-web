import { useEffect } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, ImageList, ImageListItem, Typography } from '@mui/material';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import store, { useAppDispatch } from '../../redux/store';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MovieWebScraper, SerieWebScraper } from '../../services/catalog/interface/webscraper.interface';
import { 
    setHasMoreItemsCatalogReducer, 
    setInfoFilesFromMediaReducer, 
    setInfoHashFromMediaReducer, 
    setPageCatalogReducer, 
    setRouteActionTriggeredReducer, 
    setScrollTopPositionReducer, 
    setTitlesCatalogReducer 
} from '../../redux/actions';
import { postMovieWebScraperAction } from './movie/redux/actions';
import { postSerieWebScraperAction } from './serie/redux/actions';
import { loadCatalogAction, loadCatalogBySearchAction } from './redux/actions';
import { ContextState } from '../../redux/state/context';
import { CatalogState } from '../../redux/state/catalog';

export default function CatalogList() {

    const router = useRouter()

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const dispatch = useAppDispatch()

    const contextRedux: ContextState = useSelector((state: any) => state.context)
    const catalogRedux: CatalogState = useSelector((state: any) => state.catalog)

    useEffect(() => {
        
        if (contextRedux.routeActionTriggered !== 'POP') {
            dispatch(setPageCatalogReducer(1))
            dispatch(setTitlesCatalogReducer([]))
            dispatch(setHasMoreItemsCatalogReducer(true))
            
            dispatch(setScrollTopPositionReducer(0))

            dispatch(setInfoHashFromMediaReducer(""))
            dispatch(setInfoFilesFromMediaReducer([]))

            dispatch(loadCatalogAction())
        }

        const trackScrolling = () => {
            if (document.documentElement.offsetHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
                if (store.getState().context.loading) return
                
                if (store.getState().context.scrollTopPosition > document.documentElement.scrollHeight) return

                if (contextRedux.search !== '') {
                    dispatch(loadCatalogBySearchAction(contextRedux.search, true))
                } else {
                    dispatch(loadCatalogAction(true))
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
        
        document.body.scrollTop = contextRedux.scrollTopPosition
        document.documentElement.scrollTop = contextRedux.scrollTopPosition

    }, [contextRedux.scrollTopPosition])

    useEffect(() => {
        
        if (contextRedux.search !== '') {
            dispatch(setPageCatalogReducer(1))
            dispatch(setTitlesCatalogReducer([]))
            dispatch(setHasMoreItemsCatalogReducer(true))

            dispatch(loadCatalogBySearchAction(contextRedux.search))
        }

    }, [contextRedux.search])

    const renderMovieItem = (movie: MovieWebScraper) => {

        const onPress = async () => {

            dispatch(setScrollTopPositionReducer(document.body.scrollTop || document.documentElement.scrollTop))

            dispatch(setRouteActionTriggeredReducer("PUSH"))

            try {
                dispatch(postMovieWebScraperAction(movie))

                router.push('/catalog/movie')

            } catch (err) {
                console.log(err)
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

            dispatch(setScrollTopPositionReducer(document.body.scrollTop || document.documentElement.scrollTop))

            dispatch(setRouteActionTriggeredReducer("PUSH"))

            try {
                dispatch(postSerieWebScraperAction(serie))

                router.push('/catalog/serie')

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
                catalogRedux.titles?.map((item: any) => {
                    if (item?.movie) return renderMovieItem(item.movie)
                    if (item?.serie) return renderSerieItem(item.serie)
                })
            }
        </ImageList>
    )
};