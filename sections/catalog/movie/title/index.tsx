import {
  Button, Typography, Box, Avatar, Grid
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setInfoFilesFromMediaReducer, setInfoHashFromMediaReducer } from '../../../../redux/actions';
import { ContextState } from '../../../../redux/state/context';
import { MediaState } from '../../../../redux/state/media';
import { MovieChoicedState } from '../../../../redux/state/movieChoiced';
import { useAppDispatch } from '../../../../redux/store';
import { MediaCatalogResponse } from '../../../../services/catalog/interface/response.interface';
import { PostTorrentRequest } from '../../../../services/torrent/interface/torrent';
import { postTorrentAction } from '../../redux/actions';
import DialogMovieFiles from './dialog-files';

export default function MovieTitle() {

  const dispatch = useAppDispatch()

  const contextRedux: ContextState = useSelector((state: any) => state.context)
  const movieChoicedRedux: MovieChoicedState = useSelector((state: any) => state.movieChoiced)
  const mediaRedux: MediaState = useSelector((state: any) => state.media)

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (contextRedux.routeActionTriggered === 'POP' && mediaRedux.infoFiles.length > 0) {
      setOpen(true)
    } else {
      dispatch(setInfoFilesFromMediaReducer([]))
      dispatch(setInfoHashFromMediaReducer(""))
    }
  }, [])

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

  const renderMediaItem = (media: MediaCatalogResponse) => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        key={media.magnet}
      >

        <Box sx={{ padding: 2 }}>
          <Avatar
            alt="Item"
            src={movieChoicedRedux?.movie?.imagePath || ''}
          />
        </Box>

        <Box sx={{ padding: 2 }}>
          <Typography align='center' style={{ color: '#FFFFFF' }}>
            {`Idioma: ${media.type}` || ''}
          </Typography>
          <Typography align='center' style={{ color: 'gray' }}>
            {`Resolução: ${media.resolution}` || ''}
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

      <DialogMovieFiles
        open={open}
        onClose={handleCloseModal}
      />

      <Grid container spacing={3}>
        <Grid item xs></Grid>

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
              src={movieChoicedRedux?.movie?.imagePath || ''}
              style={{ alignSelf: 'center', paddingBottom: 10 }}>
            </img>

            <Typography align='center' sx={{ color: 'white' }} variant="h4" display="block" gutterBottom>
              {movieChoicedRedux?.movie?.name || ''}
            </Typography>

          </Box>
        </Grid>

        <Grid item xs={12}>
          {movieChoicedRedux?.movie?.media?.map((media: any) => renderMediaItem(media))}
        </Grid>
      </Grid>

    </Box>
  )
}