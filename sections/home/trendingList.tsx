import { useEffect, useState, useContext } from 'react';

import { Box, Stack } from '@mui/material';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { MoviePopularityResponse } from '../../services/catalog/interface/response.interface';

import { getMoviesByPopularity } from '../../services/catalog/titles';

export default function TrendingList() {

    const [data, setData] = useState<MoviePopularityResponse[]>([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const response = await getMoviesByPopularity()

            if (response?.data?.results) {
                setData(response.data.results)
            }
        } catch (e) {

        }
    }

    const renderItem = (posterPath: string) => {

        return (
            <img
                key={posterPath + Math.random()}
                style={{ height: 300, width: 200, padding: 5, borderRadius: 15 }}
                src={`${posterPath}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${posterPath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={""}
                loading="lazy"
            />
        )
    }

    function LeftArrow() {
        const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

        return (
            <Stack
                justifyContent="center"
                sx={{
                    color: 'white',
                    display: isFirstItemVisible ? 'none' : '',
                    backgroundColor: 'rgba(0,0,0,0.4)'
                }}
                onClick={() => scrollPrev()}
            >
                <ArrowBackIosIcon sx={{ fontSize: 40 }} />
            </Stack>
        );
    }

    function RightArrow() {
        const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

        return (
            <Stack
                justifyContent="center"
                sx={{
                    color: 'white',
                    display: isLastItemVisible ? 'none' : '',
                    backgroundColor: 'rgba(0,0,0,0.4)'
                }}
                onClick={() => scrollNext()}
            >
                <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
            </Stack>
        );
    }

    return (
        <Box sx={{ padding: 7 }}>

            {
                data?.length > 0 &&
                <h2
                    style={{
                        letterSpacing: '.1rem',
                        color: 'white',
                        textDecoration: 'none',
                    }}
                >
                    Filmes em Alta
                </h2>
            }

            <ScrollMenu
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
            >
                {
                    data.map((item: MoviePopularityResponse) => renderItem(item.poster_path))
                }
            </ScrollMenu>
        </Box>
    )
};