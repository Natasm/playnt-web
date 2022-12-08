import { useEffect } from 'react';
import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchReducer } from "../../redux/actions";

export default function SearchField() {

    const dispatch = useDispatch()

    const [searchInput, setSearchInput] = useState("")

    const [open, setOpen] = useState(false)

    useEffect(() => {
        return () => {
            dispatch(setSearchReducer(''))
        }
    }, [dispatch])

    const handleKeyUp = async (e: any) => {

        if (e.key === 'Enter' && searchInput !== '') {
            try {
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
        <TextField
            fullWidth
            placeholder="Pesquise o filme ou série"
            sx={{ paddingLeft: '20px', paddingRight: '20px', input: { color: 'white' } }}
            variant="standard"
            onChange={onChangeSearchInput}
            onKeyUp={handleKeyUp}
        />
    )
}