import { useEffect, useState } from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { getMoviesByPopularityTheMovieDB } from '../../services/themoviedb';
import { TheMovieDBMovieInfo } from '../../services/themoviedb/interface/themoviedb';
import { Box, Typography } from '@material-ui/core';

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
            <ImageListItem key={sourceImage + Math.random()}>
                <img
                    src={`${sourceImage}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${sourceImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={""}
                    loading="lazy"
                />
            </ImageListItem>
        )
    }

    return (
        <Box style={{ padding: 20 }}>

            {
                data?.length > 0 &&
                <h2
                    style={{
                        fontWeight: 200,
                        letterSpacing: '.2rem',
                        color: 'white',
                        textDecoration: 'none',
                    }}
                >
                    Filmes em Alta
                </h2>
            }

            <ImageList cols={4} gap={2}>
                {
                    data.map((item: TheMovieDBMovieInfo) => {
                        return renderItem(item.poster_path)
                    })
                }
            </ImageList>
        </Box>
    )
};