import {
  Typography, Box, Grid, Stack
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
import { useMediaQuery, useTheme } from '@material-ui/core';

export default function MovieTitle() {

  const theme = useTheme()
  const matchesUpMd = useMediaQuery(theme.breakpoints.up('md'));

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
                backgroundImage: `url(${movieChoicedRedux?.movie?.imagePath})`
              }}
              color='black'
            >
              <Stack direction="row" justifyContent="center" style={{ paddingTop: 20 }}>
                <PlayArrowIcon sx={{ color: 'white', fontSize: 80 }} />
              </Stack>
            </Box>

            <Stack spacing={2} justifyContent="center">

              <Stack direction="row" spacing={1}>
                <Typography textAlign="center" style={{ color: 'gray', fontSize: 14, paddingTop: 1 }}>Idioma:</Typography>
                <Typography textAlign="center" style={{ color: 'white', fontWeight: 700 }}>
                  {media.type || ''}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
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

      <DialogMovieFiles
        open={open}
        onClose={handleCloseModal}
      />

      <Grid container>

        <Grid xs={12} sm={12} md={4}>
          <Box
            display="flex"
            justifyContent="center"
          >
            <Stack position={ matchesUpMd ? "fixed": "relative" } justifyContent="center" direction="row" spacing={5}>

              <Stack justifyContent="center" style={{ padding: 50 }}>

                <Stack>
                  <Typography align='center' sx={{ color: 'gray', paddingRight: 1, fontSize: 15 }}>
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

        <Grid container xs={12} sm={12} md={8}>
          {
            movieChoicedRedux?.movie?.media?.map((media: any) =>
              <Grid key={media.magnet} xs={12} sm={12} md={12} style={{ paddingBottom: 20 }}>
                {renderMediaItem(media)}
              </Grid>
            )
          }
        </Grid>
        
      </Grid>

    </Box>
  )
}