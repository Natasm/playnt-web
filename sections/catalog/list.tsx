import { useEffect } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, ImageList, ImageListItem, Typography } from '@mui/material';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
    resetCatalogReducer,
    resetMediaChoicedReducer,
    setRouteActionTriggeredReducer,
    setScrollTopPositionReducer
} from '../../redux/actions';
import { loadCatalogAction, loadCatalogBySearchAction } from './redux/actions';
import { ContextState } from '../../redux/state/context';
import { CatalogState } from '../../redux/state/catalog';

import InfiniteScroll from 'react-infinite-scroll-component';
import Stack from '@mui/material/Stack';
import { MovieCatalogResponse, MovieSerieCatalogResponse, SerieCatalogResponse } from '../../services/catalog/interface/response.interface';
import { postMovieAction } from './movie/redux/actions';
import { postSerieAction } from './serie/redux/actions';
import { Box } from '@material-ui/core';

export default function CatalogList() {

    const router = useRouter()

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const dispatch = useAppDispatch();

    const contextRedux: ContextState = useSelector((state: any) => state.context)
    const catalogRedux: CatalogState = useSelector((state: any) => state.catalog)

    useEffect(() => {

        if (contextRedux.routeActionTriggered !== 'POP') {
            dispatch(setScrollTopPositionReducer(0))

            dispatch(resetCatalogReducer())

            dispatch(resetMediaChoicedReducer())

            loadCatalog()
        }

    }, [])

    useEffect(() => {

        document.body.scrollTop = contextRedux.scrollTopPosition
        document.documentElement.scrollTop = contextRedux.scrollTopPosition

    }, [contextRedux.scrollTopPosition])

    const loadCatalog = () => {
        if (contextRedux.search !== '') {
            dispatch(loadCatalogBySearchAction(contextRedux.search, true))
        } else {
            dispatch(loadCatalogAction(true))
        }
    }

    const renderMovieItem = (movie: MovieCatalogResponse) => {

        const onPress = async () => {

            dispatch(setScrollTopPositionReducer(document.body.scrollTop || document.documentElement.scrollTop))

            dispatch(setRouteActionTriggeredReducer("PUSH"))

            try {
                dispatch(resetMediaChoicedReducer())

                await dispatch(postMovieAction(movie))

                router.push('/catalog/movie')

            } catch (err) {
                console.log(err)
            }
        }

        return (
            <Stack
                onClick={onPress}
                sx={{
                    borderRadius: 5,
                    minHeight: 400,
                    backgroundColor: 'black'
                }}
            >
                <Box
                    display="flex"
                    key={Math.random()}
                    style={{
                        padding: 4,
                        height: '100%',
                        backgroundPosition: 'center',
                        borderRadius: 5,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage:
                            `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),` +
                            `url(${movie.imagePath || ""})`
                    }}
                    justifyContent="center"
                >
                </Box>

                <Stack style={{ paddingTop: 15, paddingBottom: 15 }}>
                    <Typography textAlign="center" sx={{ color: 'gray', fontSize: 15 }}>
                        Filme
                    </Typography>
                    <Typography textAlign="center" sx={{ color: 'white', fontSize: 20 }}>
                        {movie.name ? movie.name : ""}
                    </Typography>
                </Stack>
            </Stack>
        )
    }

    const renderSerieItem = (serie: SerieCatalogResponse) => {

        const onPress = async () => {

            dispatch(setScrollTopPositionReducer(document.body.scrollTop || document.documentElement.scrollTop))

            dispatch(setRouteActionTriggeredReducer("PUSH"))

            try {
                dispatch(resetMediaChoicedReducer())

                await dispatch(postSerieAction(serie))

                router.push('/catalog/serie')

            } catch (err) {
                console.log(err)
            }
        }

        return (
            <Stack
                onClick={onPress}
                sx={{
                    borderRadius: 5,
                    minHeight: 400,
                    backgroundColor: 'black'
                }}
            >
                <Box
                    display="flex"
                    key={Math.random()}
                    style={{
                        padding: 4,
                        height: '100%',
                        borderRadius: 5,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage:
                            `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),` +
                            `url(${serie.imagePath || ""})`
                    }}
                    justifyContent="center"
                >
                </Box>

                <Stack style={{ paddingTop: 15, paddingBottom: 15 }}>
                    <Typography textAlign="center" sx={{ color: 'gray', fontSize: 15 }}>
                        Série
                    </Typography>

                    <Typography textAlign="center" sx={{ color: 'white', fontSize: 22 }}>
                        {serie.name ? serie.name : ""}
                    </Typography>

                    <Typography textAlign="center" sx={{ color: 'gray', fontSize: 18 }}>
                        {serie.seasons[0]?.seasonNumber ? `${serie.seasons[0].seasonNumber}ª Temporada` : ""}
                    </Typography>
                </Stack>
            </Stack>
        )
    }

    return (
        <>
            <InfiniteScroll
                dataLength={catalogRedux.titles.length}
                next={loadCatalog}
                hasMore={catalogRedux.hasMoreTitles}
                scrollThreshold={0.99}
                loader={<div></div>}
            >
                <ImageList cols={matches ? 6 : 2} gap={12} sx={{ padding: 1 }}>
                    {
                        catalogRedux.titles?.map((item: MovieSerieCatalogResponse) => {
                            if (item?.movie) return renderMovieItem(item.movie)
                            if (item?.serie) return renderSerieItem(item.serie)
                        })
                    }
                </ImageList>

                {
                    !contextRedux.loading && catalogRedux.hasMoreTitles &&
                    <Stack justifyContent="center" padding={5} direction="row">
                        <Button onClick={loadCatalog} sx={{ padding: 3, borderRadius: 20, fontSize: 20 }} variant='contained'>
                            Carregar mais
                        </Button>
                    </Stack>
                }
            </InfiniteScroll >
        </>
    )
};