import { useEffect, useState, useContext } from 'react';
import { getMoviesByPopularityTheMovieDB } from '../../services/themoviedb';
import { TheMovieDBMovieInfo } from '../../services/themoviedb/interface/themoviedb';
import { Box, Typography } from '@material-ui/core';

import { Stack } from '@mui/material';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

const URL_IMAGES_THEMOVIEDB = process.env.NEXT_PUBLIC_URL_IMAGES_THEMOVIEDB

export default function TrendingList() {

    const [data, setData] = useState<TheMovieDBMovieInfo[]>([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const response = await getMoviesByPopularityTheMovieDB()

            if (response?.data?.results) {
                setData(response.data.results)
            }
        } catch (e) {

        }
    }

    const renderItem = (posterPath: string) => {
        var sourceImage = `${URL_IMAGES_THEMOVIEDB}${posterPath}`

        return (
            <img
                width='200px'
                height='300px'
                src={`${sourceImage}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${sourceImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
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
                style={{
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
                style={{
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
        <Box style={{ padding: 20 }}>

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
                    data.map((item: TheMovieDBMovieInfo) => renderItem(item.poster_path))
                }
            </ScrollMenu>
        </Box>
    )
};