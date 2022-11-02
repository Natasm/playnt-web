import {
  Button, Typography, Box, ListItemAvatar, Avatar, ListItemText, ListItem, List, Grid
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setFilesOfMediaChoiced, setInfoHashTorrent, setIsMediaOffline, setLoadingGlobal 
} from '../../../redux/actions';
import { postTorrent } from '../../../services/torrent';
import DialogFileList from '../openFiles';

export default function InfoMovieMediaList() {

  const dispatch = useDispatch()
  const contextRedux = useSelector((state: any) => state.context)

  const mediaState = useSelector((state: any) => state.media)

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (contextRedux.routeActionTriggered === 'POP' && mediaState.media.length > 0) {
      setOpen(true)
    }
  }, [setOpen, contextRedux.routeActionTriggered, mediaState.media])

  const openFilesModal = async (torrentLink: string) => {
    dispatch(setLoadingGlobal(true))

    const response = await postTorrent(torrentLink)

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

  const renderItem = (torrent: any) => {

    return (
      <ListItem
        key={torrent.link + Math.random()}
        secondaryAction={
          <Button size="small" variant="contained" onClick={() => openFilesModal(torrent.link)}>
            Abrir arquivos
          </Button>
        }
        sx={{ backgroundColor: 'white', padding: 3 }}
      >
        <ListItemAvatar>
          <Avatar
            alt="Item"
            src={mediaState.mediaChoiced?.image || ''}
          />
        </ListItemAvatar>

        <ListItemText
          id={torrent.link + Math.random()}
          primary={torrent.title || ''}
          secondary={mediaState.mediaChoiced?.title || ''}
        />
      </ListItem>
    )
  }

  return (
    <Box>

      <DialogFileList
        open={open}
        onClose={handleCloseModal}
      />

      <Grid container spacing={3}>
        <Grid item xs></Grid>

        <Grid item xs={6}>
          <Box
            display="flex"
            sx={{ flexDirection: 'column' }}
            justifyContent="center">
            
            <img
              width='120'
              height='170'
              src={mediaState.mediaChoiced?.image || ''}
              style={{ alignSelf: 'center' }}></img>
            
            <Typography align='center' sx={{ color: 'white' }} variant="h4" display="block" gutterBottom>
              {mediaState.mediaChoiced?.title || ''}
            </Typography>

          </Box>
        </Grid>

        <Grid item xs></Grid>
      </Grid>

      <List dense sx={{ padding: 3 }}>
        {mediaState.mediaChoiced?.torrents?.map((torrent: any) => renderItem(torrent))}
      </List>

    </Box>
  )
}