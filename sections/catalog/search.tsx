import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { resetCatalogReducer, setSearchReducer } from "../../redux/actions";
import { ContextState } from "../../redux/state/context";
import { useAppDispatch } from "../../redux/store";
import { loadCatalogBySearchAction } from "./redux/actions";

export default function SearchField() {

    const dispatch = useAppDispatch()

    const [searchInput, setSearchInput] = useState("")

    const contextRedux: ContextState = useSelector((state: any) => state.context)

    useEffect(() => {
        if (contextRedux.routeActionTriggered == 'POP') {
            setSearchInput(contextRedux.search)
        }
    }, [])

    useEffect(() => {

        if (contextRedux.search !== '' && searchInput != '') {
            dispatch(resetCatalogReducer())

            dispatch(loadCatalogBySearchAction(contextRedux.search))
        }

    }, [contextRedux.search])

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

    return (
        <TextField
            fullWidth
            placeholder="Pesquise o filme ou série"
            sx={{ paddingLeft: '20px', paddingRight: '20px', input: { color: 'white' } }}
            variant="standard"
            value={searchInput}
            onChange={onChangeSearchInput}
            onKeyUp={handleKeyUp}
        />
    )
}