import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';

import { useSelector } from 'react-redux';
import { Button, DialogContent, TextField, Typography, } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../../../redux/store';
import { FileSubtitle, Subtitle } from '../../../models/subtitle';
import { ContextState } from '../../../redux/state/context';
import { SubtitleState } from '../../../redux/state/subtitle';
import { setFilesSubtitleChoicedReducer, setPermissionToHideControlsPlayerReducer } from '../../../redux/actions';
import { searchSubtitleAction } from '../redux/actions';

export function SubtitleDialog() {

    const dispatch = useAppDispatch();

    const contextRedux: ContextState = useSelector((state: any) => state.context)
    const subtitleRedux: SubtitleState = useSelector((state: any) => state.subtitle)

    const [open, setOpen] = useState(false)

    const [query, setQuery] = useState('')

    const handleClose = () => {
        dispatch(setPermissionToHideControlsPlayerReducer(true))
        setOpen(false)
        setQuery('')
    };

    const handleOpen = () => {
        dispatch(setPermissionToHideControlsPlayerReducer(false))
        setOpen(true)
    }

    const queryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    };

    const search = async () => {
        dispatch(searchSubtitleAction(query, 1))
    }

    const selectFileSubtitle = (fileSubtitle: FileSubtitle) => {
        dispatch(setFilesSubtitleChoicedReducer([fileSubtitle]))
    }

    return (
        <>
            {
                !contextRedux.loading &&

                <Dialog fullWidth maxWidth={'md'} onClose={handleClose} open={open}>
                    <DialogTitle sx={{ margin: '0 auto' }}>
                        <Typography sx={{ textAlign: 'center' }}>
                            Legendas
                        </Typography>
                        <form>
                            <TextField
                                autoFocus
                                placeholder="Dica: Pesquise em inglês"
                                label="Pesquisa"
                                variant="standard"
                                value={query}
                                onChange={queryChange}
                            />
                            <Button onClick={search}>Pesquisar</Button>
                        </form>
                    </DialogTitle>

                    <DialogContent>
                        <List>
                            {
                                subtitleRedux.subtitles?.map((subtitle: Subtitle) => (
                                    subtitle?.files?.map((fileSubtitle: FileSubtitle) => (
                                        <ListItem key={Math.random()}>
                                            <Button
                                                onClick={() => selectFileSubtitle(fileSubtitle)}
                                                sx={{ color: 'black', backgroundColor: 'rgba(0,0,0,0.2)' }}
                                                fullWidth
                                            >
                                                {fileSubtitle.file_name || ''}
                                                {subtitle.forced ? <ClosedCaptionIcon /> : ''}
                                            </Button>
                                        </ListItem>
                                    ))
                                ))
                            }
                        </List>
                    </DialogContent>

                </Dialog>
            }

            <Button
                size="small"
                variant="contained"
                sx={{ color: 'black', marginLeft: 2, backgroundColor: 'white' }}
                onClick={handleOpen}
            >
                Pesquisar legenda
            </Button>
        </>
    );
}