import {
  Button, Typography, Box, Avatar, Grid, Stack
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

export default function SerieTitle() {

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
        sx={{ paddingLeft: 4, paddingRight: 4, paddingBottom: 4 }}
      >
        <Stack direction="row" spacing={4}
          sx={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: 3, boxShadow: '0px 0px 15px rgba(255,255,255,0.2)' }}
        >

          <Stack direction="row" spacing={2}>

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

            <Stack spacing={1}>

              <Stack direction="row" spacing={2}>
                <Typography textAlign="center" style={{ color: 'gray', fontSize: 14, padding: 7 }}>Episódio</Typography>
                <Typography textAlign="center" style={{ color: 'white', padding: 7 }}>
                  {episode.episodeNumberRange || ''}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Typography textAlign="center" style={{ color: 'gray', fontSize: 14, padding: 7 }}>Idioma</Typography>
                <Typography textAlign="center" style={{ color: 'white', padding: 7 }}>
                  {media.type || ''}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Typography textAlign="center" style={{ color: 'gray', fontSize: 14, padding: 7 }}>Resolução</Typography>
                <Typography textAlign="center" style={{ color: 'white', padding: 7, fontWeight: 700 , backgroundColor: '#00315c', borderRadius: 20 }}>
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

      <Grid container spacing={3}>

        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="center"
            style={{ paddingBottom: 40 }}
          >
            <Stack justifyContent="center" direction="row" spacing={5}>

              <Stack justifyContent="center">

                <Stack>
                  <Typography align='center' sx={{ color: 'gray', paddingRight: 1, fontSize: 15 }}>
                    Série:
                  </Typography>

                  <Typography align='center' sx={{ color: 'white', fontSize: 50 }}>
                    {serieChoicedRedux?.serie?.name || ''}
                  </Typography>
                </Stack>

                <Stack justifyContent="center" direction="row">
                  <Typography align='center' sx={{ color: 'gray', paddingRight: 1 }} variant="h6" display="block" gutterBottom>
                    Temporada:
                  </Typography>

                  <Typography align='center' sx={{ color: 'white' }} variant="h5" display="block" gutterBottom>
                    {`${serieChoicedRedux?.serie?.seasons[0]?.seasonNumber || ''}ª Temporada`}
                  </Typography>
                </Stack>

              </Stack>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12}>
          {
            serieChoicedRedux?.serie?.seasons[0]?.episodes?.map((episode: any) =>
              episode?.media?.map((media: any) => {
                if (serieChoicedRedux?.serie?.seasons[0])
                  return renderMediaItem(serieChoicedRedux?.serie?.seasons[0], episode, media)
              })
            )
          }
        </Grid>
      </Grid>
    </Box>
  )
}