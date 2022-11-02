import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { useSelector } from 'react-redux';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import { deleteCacheSelected, loadCache } from '../../redux/action/home';
import { useAppDispatch } from '../../redux/store';
import { setCacheGlobal } from '../../redux/actions';

export function DialogButtonCache() {

    const dispatch = useAppDispatch();

    const loadingGlobal = useSelector((state: any) => state.loadingGlobal)
    const cacheGlobal = useSelector((state: any) => state.cacheGlobal)

    const [open, setOpen] = useState(false)

    const [elements, setElements] = useState<any>({})

    const handleClose = () => {
        setOpen(false)
        dispatch(setCacheGlobal([]))
    };

    const handleOpen = () => {
        dispatch(loadCache())
        setOpen(true)
    }

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setElements((prev: any) => {
            return { ...prev, [event.target.name]: { name: event.target.name, checked: event.target.checked } }
        })
    };

    const deleteSelected = async () => {
        var listNamesToDelete = []

        for (var key in elements) {
            if (elements[key]?.checked) listNamesToDelete.push(key)
        }

        dispatch(deleteCacheSelected(listNamesToDelete))
    }

    return (
        <>
            {
                !loadingGlobal.loading &&

                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle>Selecione para apagar filmes/séries baixados ou baixando</DialogTitle>
                    <List sx={{ pt: 0 }}>
                        {
                            cacheGlobal.filesName?.map((filename: string) => (
                                <ListItem key={filename + Math.random()}>
                                    <FormControlLabel
                                        key={filename + Math.random()}
                                        control={<Checkbox
                                            name={filename}
                                            checked={elements[filename]?.checked || false}
                                            onChange={handleChange}
                                        />}
                                        label={filename}
                                    />
                                </ListItem>
                            ))
                        }
                    </List>
                    <Button onClick={deleteSelected}>Excluir</Button>
                </Dialog>
            }

            <Button sx={{ color: 'white' }} onClick={handleOpen}>Limpar cache</Button>
        </>
    );
}