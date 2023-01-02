import { useContext } from 'react';

import { Box, Stack } from '@mui/material';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { TMDBMoviePopularityDto } from '../../services/catalog/interface/response.interface';

interface Props {
    data: TMDBMoviePopularityDto[]
}

export default function TrendingList(props: Props) {

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
                props.data?.length > 0 &&
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
                    props.data.map((item: TMDBMoviePopularityDto) => renderItem(item.poster_path))
                }
            </ScrollMenu>
        </Box>
    )
};