import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function DialogSerieFiles(props: Props) {

    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Arquivos</DialogTitle>
            <List sx={{ pt: 0 }}>
            </List>
        </Dialog>
    );
}