import {
  Button, Typography, Box, Avatar, Grid
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilesOfMediaChoiced, setInfoHashTorrent, setIsMediaOffline, setLoadingGlobal
} from '../../../redux/actions';
import { EpisodeCatalogResponse, MediaCatalogResponse, SeasonCatalogResponse } from '../../../services/catalog/interface/response.interface';
import { postTorrent } from '../../../services/torrent';
import { PostTorrentRequest } from '../../../services/torrent/interface/torrent';
import DialogFileList from '../openFiles';

export default function InfoSerieMediaList() {

  const dispatch = useDispatch()
  const contextRedux = useSelector((state: any) => state.context)

  const mediaState = useSelector((state: any) => state.media)

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (contextRedux.routeActionTriggered === 'POP' && mediaState.media.length > 0) {
      setOpen(true)
    }
  }, [setOpen, contextRedux.routeActionTriggered, mediaState.media])

  const openFilesModal = async (postTorrentRequest: PostTorrentRequest) => {
    dispatch(setLoadingGlobal(true))

    const response = await postTorrent(postTorrentRequest)

    dispatch(setLoadingGlobal(false))

    if (response?.infoFiles && response.infoHash) {
      dispatch(setIsMediaOffline(false))
      dispatch(setInfoHashTorrent(response.infoHash))
      dispatch(setFilesOfMediaChoiced(response.infoFiles))
    }

    setOpen(true)
  }

  const handleCloseModal = () => {
    dispatch(setFilesOfMediaChoiced([]))
    setOpen(false);
  };

  const renderMediaItem = (season: SeasonCatalogResponse, episode: EpisodeCatalogResponse, media: MediaCatalogResponse) => {

    return (
      <Box 
        display="flex"
        justifyContent="center"
      >

        <Box sx={{ padding: 2 }}>
          <Avatar
            alt="Item"
            src={mediaState.mediaChoiced?.imagePath || ''}
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

      <DialogFileList
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
              src={mediaState.mediaChoiced?.imagePath || ''}
              style={{ alignSelf: 'center', paddingBottom: 10 }}>
            </img>

            <Typography align='center' sx={{ color: 'white' }} variant="h4" display="block" gutterBottom>
              {mediaState.mediaChoiced?.name || ''}
            </Typography>

          </Box>
        </Grid>

        <Grid item xs={12}>
          {
            mediaState.mediaChoiced?.seasons[0]?.episodes?.map((episode: any) =>
              episode?.media?.map((media: any) =>
                renderMediaItem(mediaState.mediaChoiced?.seasons[0], episode, media)
              )
            )
          }
        </Grid>
      </Grid>
    </Box>
  )
}