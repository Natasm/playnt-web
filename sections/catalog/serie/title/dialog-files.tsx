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
import { useRouter } from 'next/router';
import { PlayerTitleType } from '../../../../redux/state/player';
import { setFileNameStreamPlayerReducer, setTitleTypePlayerReducer } from '../../../../redux/actions';
import { FileInfo } from '../../../../services/torrent/interface/torrent';
import { MediaState } from '../../../../redux/state/media';

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function DialogSerieFiles(props: Props) {
    
    const dispatch = useDispatch();
    const router = useRouter();

    const { onClose, open } = props;

    const mediaRedux: MediaState = useSelector((state: any) => state.media)

    const handleClose = () => {
        onClose();
    };

    const goPlay = (filename: string) => {
        dispatch(setTitleTypePlayerReducer(PlayerTitleType.SERIE))
        dispatch(setFileNameStreamPlayerReducer(filename))
        router.push('/player')
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Arquivos</DialogTitle>
            <List sx={{ pt: 0 }}>
                {
                    mediaRedux?.infoFiles?.map((infoFile: FileInfo) => (
                        <ListItem button onClick={() => goPlay(infoFile.name)} key={Math.random()}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <VideoFileIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText style={{ wordWrap: "break-word" }} primary={infoFile.name} />
                        </ListItem>
                    ))
                }
            </List>
        </Dialog>
    );
}