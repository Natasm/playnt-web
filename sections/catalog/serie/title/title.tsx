import {
  Typography, Box, Grid, Stack
} from '@mui/material';
import { useSelector } from 'react-redux';
import { SerieChoicedState } from '../../../../redux/state/serieChoiced';

import { useRouter } from 'next/router';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';

import { useMediaQuery, useTheme } from '@material-ui/core';
import { EpisodeMediaResponse, EpisodeResponse, SeasonResponse } from '../../../../services/stream/interface/response.interface';
import { LoadTorrentRequest } from '../../../../services/stream/interface/request.interface';
import { useAppDispatch } from '../../../../redux/store';
import { loadTorrentAction } from '../../redux/actions';
import { setFileNameStreamPlayerReducer, setInfoHashPlayerReducer, setSerieMediaChoicedReducer } from '../../../../redux/actions';

export default function Title() {

  const dispatch = useAppDispatch()

  const router = useRouter()

  const theme = useTheme()
  const matchesUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const serieChoicedRedux: SerieChoicedState = useSelector((state: any) => state.serieChoiced)

  const renderMediaItem = (season: SeasonResponse, episode: EpisodeResponse, media: EpisodeMediaResponse) => {

    const tmdbEpisode = serieChoicedRedux?.tmdb?.episodes.find((value) => value.episode_number == episode.episodeNumber)

    const play = async () => {

      const request: LoadTorrentRequest = {
        magnet: media.magnet,
        episodeMediaId: media.id,
        episodeNumber: episode.episodeNumber
      }

      const response = await dispatch(loadTorrentAction(request))

      if (response) {

        dispatch(setSerieMediaChoicedReducer({
          episodeId: episode.id,
          episodeMediaId: media.id,
          seasonId: season.id,
          serieId: serieChoicedRedux.serie?.id
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
            backgroundPosition: 'center',
            borderRadius: 3,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage:
              `url(${tmdbEpisode?.still_path || ""})`
          }}
          justifyContent="center"
        >
          <Stack>
            <PlayArrowIcon sx={{ color: 'white', fontSize: 80 }} />
          </Stack>

        </Box>

        <Stack direction="row" spacing={2} justifyContent="center">

          <Stack spacing={1} sx={{ paddingTop: 2 }}>

            <Typography textAlign="center" style={{ color: 'white', fontSize: 22 }}>
              Episódio: {episode.episodeNumber || ''}
            </Typography>

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
                    {serieChoicedRedux?.serie?.name || ''}
                  </Typography>
                </Stack>

                <Typography sx={{ color: 'gray', fontSize: 20, paddingBottom: 2 }}>
                  { serieChoicedRedux?.serie?.seasons[0]?.seasonNumber?
                    `${serieChoicedRedux?.serie?.seasons[0]?.seasonNumber}ª Temporada` : ""
                  }
                </Typography>

                <Stack spacing={2}>
                  <Typography sx={{ color: 'gray' }}>
                    {
                      `Avaliação: ${serieChoicedRedux?.tmdb?.tv_results[0]?.vote_average || "Nenhuma informação"}`
                    }
                  </Typography>

                  <Typography sx={{ color: 'gray', width: matchesUpMd ? "50%" : "100%" }}>
                    {serieChoicedRedux?.tmdb?.tv_results[0]?.overview || ''}
                  </Typography>

                </Stack>

              </Stack>
            </Stack>
          </Box>
        </Grid>

        <Grid container spacing={2} sx={{ padding: 3 }}>
          {
            serieChoicedRedux?.serie?.seasons[0]?.episodes?.sort((ep1, ep2) => {
              if (ep1.episodeNumber <= ep2.episodeNumber) return -1
              else return 1
            }).map((episode: EpisodeResponse) =>
              episode?.media?.map((media: EpisodeMediaResponse) => {

                var season = serieChoicedRedux?.serie?.seasons[0]

                if (season) {
                  return (
                    <Grid item key={media.magnet} xs={12} sm={12} md={4} style={{ paddingBottom: 20 }}>
                      {renderMediaItem(season, episode, media)}
                    </Grid>
                  )
                }
              })
            )
          }
        </Grid>

      </Grid>
    </Box>
  )
}