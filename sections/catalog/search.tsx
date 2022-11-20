import { useEffect } from 'react';
import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchReducer } from "../../redux/actions";

//import DialogFileList from "./openFiles";

export default function SearchField() {

    const dispatch = useDispatch()

    //const contextRedux: = useSelector((state: any) => state.context)
    //const mediaRedux: = useSelector((state: any) => state.media)

    const [searchInput, setSearchInput] = useState("")

    const [open, setOpen] = useState(false)

    /*useEffect(() => {
        if (contextRedux.routeActionTriggered === "POP" && media.mediaChoicedFiles.length > 0) {
            setOpen(true)
        }
    }, [contextRedux.routeActionTriggered, media.mediaChoicedFiles])*/

    useEffect(() => {
        return () => {
            dispatch(setSearchReducer(''))
        }
    }, [dispatch])

    const handleKeyUp = async (e: any) => {

        if (e.key === 'Enter' && searchInput !== '') {
            try {
                /*if (searchInput.startsWith('magnet')) {

                    try {
                        dispatch(setLoadingGlobal(true))

                        const response = await postTorrent(searchInput)

                        if (response?.infoHash && response?.infoFiles) {
                            dispatch(setIsMediaOffline(false))
                            dispatch(setInfoHashTorrent(response.infoHash))
                            dispatch(setFilesOfMediaChoiced(response.infoFiles))

                            setOpen(true)
                        }
                    } catch (e) {
                        alert('Não foi possível abrir o link!')
                    } finally {
                        dispatch(setLoadingGlobal(false))
                    }

                } else {
                    dispatch(setSearchGlobal(searchInput))
                }*/
                dispatch(setSearchReducer(searchInput))
            } catch { }
        }
    }

    const onChangeSearchInput = (event: any) => {
        setSearchInput(event.target.value)
    }

    const onClose = () => {
        setOpen(false)
    }

    return (
        <>
            <TextField
                fullWidth
                placeholder="Pesquise o filme"
                sx={{ paddingLeft: '20px', paddingRight: '20px', input: { color: 'white' } }}
                variant="standard"
                onChange={onChangeSearchInput}
                onKeyUp={handleKeyUp}
            />

            {/*<DialogFileList 
                open={open} 
                onClose={onClose}
            />*/}
        </>
    )
}