import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import { blue } from '@mui/material/colors';

import { useDispatch, useSelector } from 'react-redux';
import { setInfoHashTorrent, setIsMediaOffline, setUriStreamFileTorrent } from '../../redux/actions';
import { formatURIStreamFileOffline } from '../../utils/formatters';
import { useRouter } from 'next/router';
import { TorrentItem } from '../../services/torrent/interface/torrent';

interface Props {
    open: boolean;
    onClose: () => void;
}

export function DialogFileList(props: Props) {
    
    const dispatch = useDispatch();
    
    const router = useRouter();

    const { onClose, open } = props;

    const torrent = useSelector((state: any) => state.torrent)
    const offlineState = useSelector((state: any) => state.offline)

    const handleClose = () => {
        onClose();
    };

    const goPlay = (filename: string) => {
        dispatch(setIsMediaOffline(true))
        
        dispatch(setInfoHashTorrent(offlineState.mediaChoiced.torrent.infohash))
        dispatch(
            setUriStreamFileTorrent(
                formatURIStreamFileOffline(`${offlineState.mediaChoiced.torrent.pathDir}/${filename}`)
            )
        )
        router.push('/player')
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Arquivos</DialogTitle>
            <List sx={{ pt: 0 }}>
                {
                    offlineState.mediaChoiced?.files?.names?.map((filename: string) => (
                        <ListItem button onClick={() => goPlay(filename)} key={filename + Math.random()}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <VideoFileIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText style={{ wordWrap: "break-word" }} primary={filename} />
                        </ListItem>
                    ))
                }
            </List>
        </Dialog>
    );
}