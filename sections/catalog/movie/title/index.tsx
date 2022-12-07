import {
  Button, Typography, Box, Avatar, Grid, Stack, List
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

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

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
                backgroundImage: `url(${movieChoicedRedux?.movie?.imagePath})`
              }}
              color='black'
            >
              <Stack direction="row" justifyContent="center" style={{ paddingTop: 20 }}>
                <PlayArrowIcon sx={{ color: 'white', fontSize: 80 }} />
              </Stack>
            </Box>

            <Stack spacing={5}>

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

      <DialogMovieFiles
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
                  <Typography align='center' sx={{ color: 'gray', fontSize: 20 }}>
                    Filme:
                  </Typography>

                  <Typography align='center' sx={{ color: 'white', fontSize: 50 }}>
                    {movieChoicedRedux?.movie?.name || ''}
                  </Typography>
                </Stack>

              </Stack>

            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12}>
          {
            movieChoicedRedux?.movie?.media?.map((media: any) => renderMediaItem(media))
          }
        </Grid>
      </Grid>

    </Box>
  )
}