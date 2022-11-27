import {
  Button, Typography, Box, Avatar, Grid, Stack
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
        sx={{ paddingLeft: 4, paddingRight: 4, paddingBottom: 4 }}
      >
        <Stack direction="row" spacing={3}>

          <Stack justifyContent="center">
            <Avatar
              alt="Item"
              src={movieChoicedRedux?.movie?.imagePath || ''}
            />
          </Stack>

          <Stack justifyContent="center">
            <Typography align='center' style={{ fontSize: 25, color: '#FFFFFF' }}>
              {`Idioma: ${media.type || ''}`}
            </Typography>
            <Typography align='center' style={{ fontSize: 15, color: 'gray' }}>
              {`Resolução: ${media.resolution || ''}`}
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

      <DialogMovieFiles
        open={open}
        onClose={handleCloseModal}
      />

      <Grid container spacing={3}>

        <Grid item xs={12} md={4}>
          <Box
            display="flex"
            justifyContent="center"
          >
            <Stack justifyContent="center" spacing={3}>

              <img
                width='120'
                height='170'
                src={movieChoicedRedux?.movie?.imagePath || ''}
                style={{ alignSelf: 'center', paddingBottom: 10 }}>
              </img>

              <Stack justifyContent="center">

                <Stack direction="row">
                  <Typography align='center' sx={{ color: 'gray', paddingRight: 1 }} variant="h6" display="block" gutterBottom>
                    Filme:
                  </Typography>

                  <Typography align='center' sx={{ color: 'white' }} variant="h5" display="block" gutterBottom>
                    {movieChoicedRedux?.movie?.name || ''}
                  </Typography>
                </Stack>

              </Stack>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          {movieChoicedRedux?.movie?.media?.map((media: any) => renderMediaItem(media))}
        </Grid>
      </Grid>

    </Box>
  )
}