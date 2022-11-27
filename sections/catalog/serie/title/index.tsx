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
        <Stack direction="row" spacing={3}>

          <Stack justifyContent="center">
            <Avatar
              alt="Item"
              src={serieChoicedRedux?.serie?.imagePath || ''}
            />
          </Stack>

          <Stack justifyContent="center">
            <Typography align='center' style={{ fontSize: 25, color: '#FFFFFF' }}>
              {`Episódio ${episode.episodeNumberRange || ''}`}
            </Typography>
            <Typography align='center' style={{ fontSize: 15, color: 'gray' }}>
              {`Idioma: ${media.type || ''} - Resolução: ${media.resolution || ''}`}
            </Typography>
          </Stack>

          <Stack justifyContent="center">
            <Button size="small" variant="contained" onClick={() => openFilesModal({
              magnet: media.magnet,
              media_id: Number(media.id)
            })}>
              Abrir arquivos
            </Button>
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

        <Grid item xs={12} md={4}>
          <Box
            display="flex"
            justifyContent="center"
          >
            <Stack justifyContent="center" spacing={3}>

              <img
                width='120'
                height='170'
                src={serieChoicedRedux?.serie?.imagePath || ''}
                style={{ alignSelf: 'center', paddingBottom: 10 }}>
              </img>

              <Stack justifyContent="center">

                <Stack direction="row">
                  <Typography align='center' sx={{ color: 'gray', paddingRight: 1 }} variant="h6" display="block" gutterBottom>
                    Série:
                  </Typography>

                  <Typography align='center' sx={{ color: 'white' }} variant="h5" display="block" gutterBottom>
                    {serieChoicedRedux?.serie?.name || ''}
                  </Typography>
                </Stack>

                <Stack direction="row">
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

        <Grid item xs={12} md={8}>
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