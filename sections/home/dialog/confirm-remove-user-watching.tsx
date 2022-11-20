import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { Button, DialogActions, DialogContentText } from '@material-ui/core';

interface Props {
    open: boolean;
    onAction: () => void;
    onClose: () => void;
}

export default function DialogConfirmRemoveUserWatching(props: Props) {

    const { onClose, open, onAction } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle textAlign="center">Remover</DialogTitle>
            <DialogContentText align="center" style={{ padding: 10 }}>
                Tem certeza que deseja remover?
            </DialogContentText>
            <DialogActions>
                <Button onClick={onAction}>Sim</Button>
                <Button onClick={handleClose}>Não</Button>
            </DialogActions>
        </Dialog>
    );
}