import { useEffect, useState } from 'react';
import { Box, Button, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { DialogFileList } from './openFiles';
import { setMediaOfflineChoiced } from '../../redux/actions';
import { loadTorrents } from '../../redux/action/downloaded';
import { TorrentItem } from '../../services/torrent/interface/torrent';

export default function TorrentsDownloadedList() {

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false);

    const mediaOfflineState = useSelector((state: any) => state.offline)
    const scrollTopPosition = useSelector((state: any) => state.scrollGlobal.scrollTopPosition)

    useEffect(() => {
        document.body.scrollTop = scrollTopPosition
        document.documentElement.scrollTop = scrollTopPosition

    }, [scrollTopPosition])

    useEffect(() => {
        dispatch(loadTorrents())
    }, [])

    const renderItem = (item: TorrentItem) => {

        const onPress = () => {
            dispatch(setMediaOfflineChoiced(item))

            setOpen(true)
        }

        return (
            <ListItem
                key={item.torrent.infoHash + Math.random()}
                secondaryAction={
                    <Button size="small" variant="contained" onClick={onPress}>
                        Escolho esse
                    </Button>
                }
                sx={{ backgroundColor: 'white', padding: 3 }}
            >
                <ListItemText
                    id={item.torrent.infoHash + Math.random()}
                    primary={item.torrent.nameDir || ''}
                    secondary={item.torrent.downloaded ? 'Baixado' : 'Baixando...'}
                />
            </ListItem>
        )
    }

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <>
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

                        <Typography align='center' sx={{ color: 'white' }} variant="h4" display="block" gutterBottom>
                            {mediaOfflineState.title || ''}
                        </Typography>

                    </Box>
                </Grid>

                <Grid item xs></Grid>
            </Grid>

            <List dense sx={{ padding: 3 }}>
                {
                    mediaOfflineState.media?.map((item: TorrentItem) => {
                        return renderItem(item)
                    })
                }
            </List>
        </>
    )
};