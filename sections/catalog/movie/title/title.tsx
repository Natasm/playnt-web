import {
  Typography, Box, Grid, Stack
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { MovieChoicedState } from '../../../../redux/state/movieChoiced';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';

import { useMediaQuery, useTheme } from '@material-ui/core';
import { MovieMediaResponse } from '../../../../services/stream/interface/response.interface';
import { useAppDispatch } from '../../../../redux/store';
import { loadTorrentAction } from '../../redux/actions';
import { LoadTorrentRequest } from '../../../../services/stream/interface/request.interface';
import { setFileNameStreamPlayerReducer, setInfoHashPlayerReducer, setMovieMediaChoicedReducer } from '../../../../redux/actions';

export default function Title() {

  const dispatch = useAppDispatch()

  const router = useRouter()

  const theme = useTheme()
  const matchesUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const movieChoicedRedux: MovieChoicedState = useSelector((state: any) => state.movieChoiced)

  const renderMediaItem = (media: MovieMediaResponse) => {

    const play = async () => {
      
      const request: LoadTorrentRequest = {
        magnet: media.magnet,
        movieMediaId: media.id
      }

      const response = await dispatch(loadTorrentAction(request))

      if (response) {

        dispatch(setMovieMediaChoicedReducer({
          movieMediaId: media.id,
          movieId: movieChoicedRedux.movie?.id
        }))

        dispatch(setInfoHashPlayerReducer(response.infoHash))
        dispatch(setFileNameStreamPlayerReducer(response.fileName))

        router.push("/player")
      }

    }

    return (
      <>
        <Box
          onClick={play}
          display="flex"
          key={media.magnet}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage:
              `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)),` +
              `url(${movieChoicedRedux?.tmdb?.movie_results[0]?.backdrop_path || ""})`
          }}
          justifyContent="center"
        >
          <Stack>
            <PlayArrowIcon sx={{ color: 'white', fontSize: 80 }} />
          </Stack>
        </Box>

        <Stack direction="row" spacing={2} justifyContent="center">

          <Stack spacing={1} sx={{ paddingTop: 2 }}>

            <Stack direction="row" spacing={1}>

              <AudiotrackIcon sx={{ color: 'gray' }} />
              <Typography style={{ color: 'gray' }}>
                {media.type || ''}
              </Typography>

              <AspectRatioIcon sx={{ color: 'gray' }} />
              <Typography style={{ color: 'gray' }}>
                {media.resolution || ''}
              </Typography>

            </Stack>

          </Stack>
        </Stack>
      </>
    )
  }

  return (
    <Box>

      <Grid container>

        <Grid item xs={12} sm={12} md={12}>
          <Box
            display="flex"
            justifyContent={matchesUpMd ? "start" : "center"}
          >
            <Stack justifyContent="center" direction="row" spacing={5}>

              <Stack justifyContent="center" style={{ padding: 40 }}>

                <Stack style={{ width: matchesUpMd ? "50%" : "100%" }}>
                  <Typography sx={{ color: 'white', fontSize: 30, fontWeight: 700 }}>
                    {movieChoicedRedux?.movie?.name || ''}
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  <Typography sx={{ color: 'gray' }}>
                    {
                      `Avaliação: ${movieChoicedRedux?.tmdb?.movie_results[0]?.vote_average || "Nenhuma informação"}`
                    }
                  </Typography>

                  <Typography sx={{ color: 'gray', width: matchesUpMd ? "50%" : "100%" }}>
                    {movieChoicedRedux?.tmdb?.movie_results[0]?.overview || ''}
                  </Typography>

                </Stack>

              </Stack>
            </Stack>
          </Box>
        </Grid>

        <Grid container  spacing={2} sx={{ padding: 3 }}>
          {
            movieChoicedRedux?.movie?.media?.map((media: MovieMediaResponse) =>
              <Grid item key={media.magnet} xs={12} sm={12} md={4} style={{ paddingBottom: 20 }}>
                {renderMediaItem(media)}
              </Grid>
            )
          }
        </Grid>

      </Grid>
    </Box>
  )
}