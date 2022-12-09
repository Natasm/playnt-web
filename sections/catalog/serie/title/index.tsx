import {
  Typography, Box, Grid, Stack
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setInfoFilesFromMediaReducer, setInfoHashFromMediaReducer } from '../../../../redux/actions';
import { MediaState } from '../../../../redux/state/media';
import { SerieChoicedState } from '../../../../redux/state/serieChoiced';
import { useAppDispatch } from '../../../../redux/store';
import { EpisodeCatalogResponse, MediaCatalogResponse, SeasonCatalogResponse } from '../../../../services/catalog/interface/response.interface';
import { PostTorrentRequest } from '../../../../services/torrent/interface/torrent';
import { postTorrentAction } from '../../redux/actions';
import DialogSerieFiles from './dialog-files';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useMediaQuery, useTheme } from '@material-ui/core';

export default function SerieTitle() {

  const theme = useTheme()
  const matchesUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const dispatch = useAppDispatch()

  const contextRedux = useSelector((state: any) => state.context)
  const serieChoicedRedux: SerieChoicedState = useSelector((state: any) => state.serieChoiced)
  const mediaRedux: MediaState = useSelector((state: any) => state.media)

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (contextRedux.routeActionTriggered === 'POP' && mediaRedux.infoFiles.length > 0) {
      setOpen(true)
    }
  }, [setOpen, contextRedux.routeActionTriggered, mediaRedux.infoFiles])

  const openFilesModal = async (postTorrentRequest: PostTorrentRequest) => {
    dispatch(postTorrentAction(postTorrentRequest))
  }

  useEffect(() => {
    if (mediaRedux.infoFiles.length > 0) {
      setOpen(true)
    }
  }, [mediaRedux.infoFiles])

  const handleCloseModal = () => {
    dispatch(setInfoFilesFromMediaReducer([]))
    dispatch(setInfoHashFromMediaReducer(""))
    setOpen(false);
  };

  const renderMediaItem = (season: SeasonCatalogResponse, episode: EpisodeCatalogResponse, media: MediaCatalogResponse) => {

    return (

      <Box
        display="flex"
        justifyContent="center"
        key={media.magnet}
        sx={{ paddingBottom: 4 }}
      >
        <Stack direction="row" spacing={4}
          sx={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: 3, borderRadius: 7, boxShadow: '0px 0px 10px rgba(255,255,255,0.2)' }}
        >

          <Stack direction="row" spacing={3} style={{ padding: 10 }}>

            <Box
              onClick={() => openFilesModal({
                magnet: media.magnet,
                media_id: Number(media.id)
              })}
              sx={{
                height: '120px',
                width: '90px',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${serieChoicedRedux?.serie?.imagePath})`
              }}
              color='black'
            >
              <Stack direction="row" justifyContent="center" style={{ paddingTop: 20 }}>
                <PlayArrowIcon sx={{ color: 'white', fontSize: 80 }} />
              </Stack>
            </Box>

            <Stack spacing={2} justifyContent="center">

              <Stack direction="row" spacing={3}>
                <Typography textAlign="center" style={{ color: 'gray', fontSize: 22, paddingTop: 1 }}>
                  Episódio: {episode.episodeNumberRange || ''}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={3}>
                <Typography textAlign="center" style={{ color: 'gray', fontSize: 14, paddingTop: 1 }}>Idioma:</Typography>
                <Typography textAlign="center" style={{ color: 'white' }}>
                  {media.type || ''}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={3}>
                <Typography textAlign="center" style={{ color: 'gray', fontSize: 14, paddingTop: 8 }}>Resolução:</Typography>
                <Typography textAlign="center" style={{ color: 'white', padding: 7, fontWeight: 700, backgroundColor: '#00315c', borderRadius: 20 }}>
                  {media.resolution || ''}
                </Typography>
              </Stack>

            </Stack>

          </Stack>

        </Stack>
      </Box>
    )
  }

  return (
    <Box>

      <DialogSerieFiles
        open={open}
        onClose={handleCloseModal}
      />

      <Grid container>

        <Grid item xs={12} sm={12} md={4}>
          <Box
            display="flex"
            justifyContent="center"
          >
            <Stack position={ matchesUpMd ? "fixed": "relative" } justifyContent="center" direction="row" spacing={5}>

              <Stack justifyContent="center" style={{ padding: 50 }}>

                <Stack style={{ paddingBottom: 30 }}>
                  <Typography align='center' sx={{ color: 'gray', paddingRight: 1, fontSize: 15 }}>
                    Série:
                  </Typography>

                  <Typography align='center' sx={{ color: 'white', fontSize: 50 }}>
                    {serieChoicedRedux?.serie?.name || ''}
                  </Typography>
                </Stack>

                <Stack>
                  <Typography align='center' sx={{ color: 'gray' }}>
                    Temporada:
                  </Typography>

                  <Typography align='center' sx={{ color: 'white', fontSize: 25 }}>
                    {`${serieChoicedRedux?.serie?.seasons[0]?.seasonNumber || ''}ª Temporada`}
                  </Typography>
                </Stack>

              </Stack>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={8}> 
          {
            serieChoicedRedux?.serie?.seasons[0]?.episodes?.map((episode: any) =>
              episode?.media?.map((media: any) => {
                if (serieChoicedRedux?.serie?.seasons[0])
                  return (
                    <Grid item key={media.magnet} xs={12} sm={12} md={12} style={{ paddingBottom: 20 }}>
                      {renderMediaItem(serieChoicedRedux?.serie?.seasons[0], episode, media)}
                    </Grid>
                  )
              })
            )
          }
        </Grid>

      </Grid>
    </Box>
  )
}