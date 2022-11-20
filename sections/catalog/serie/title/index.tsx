import {
  Button, Typography, Box, Avatar, Grid
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
      >

        <Box sx={{ padding: 2 }}>
          <Avatar
            alt="Item"
            src={serieChoicedRedux?.serie?.imagePath || ''}
          />
        </Box>

        <Box sx={{ padding: 2 }}>
          <Typography align='center' style={{ color: '#FFFFFF' }}>
            {`Episódio ${episode.episodeNumberRange} - ${season.seasonNumber}ª Temporada` || ''}
          </Typography>
          <Typography align='center' style={{ color: 'gray' }}>
            {`Idioma: ${media.type} - Resolução: ${media.resolution}` || ''}
          </Typography>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Button size="small" variant="contained" onClick={() => openFilesModal({
            magnet: media.magnet,
            media_id: Number(media.id)
          })}>
            Abrir arquivos
          </Button>
        </Box>

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

        <Grid item xs={12}>
          <Box
            display="flex"
            sx={{ flexDirection: 'column' }}
            justifyContent="center"
            style={{ paddingBottom: 20 }}
          >
            <img
              width='120'
              height='170'
              src={serieChoicedRedux?.serie?.imagePath || ''}
              style={{ alignSelf: 'center', paddingBottom: 10 }}>
            </img>

            <Typography align='center' sx={{ color: 'white' }} variant="h4" display="block" gutterBottom>
              {serieChoicedRedux?.serie?.name || ''}
            </Typography>

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