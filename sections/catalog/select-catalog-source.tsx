import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { ContextState } from '../../redux/state/context';
import { useAppDispatch } from '../../redux/store';
import { setCatalogSourceReducer } from '../../redux/actions';

export default function SelectCatalogSource() {

    const dispatch = useAppDispatch()

    const contextRedux: ContextState = useSelector((state: any) => state.context)

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setCatalogSourceReducer(Number(event.target.value)))
    };

    return (
        <FormControl sx={{ minWidth: 170 }}>
            <InputLabel sx={{ color: 'white' }}>Fonte de pesquisa</InputLabel>
            <Select
                value={String(contextRedux.catalogSource)}
                label="Fonte"
                onChange={handleChange}
                sx={{ color: 'white', borderColor: 'white' }}
            >
                <MenuItem value={1}>FilmesTorrentTv</MenuItem>
                <MenuItem value={2}>Bludv</MenuItem>
            </Select>
        </FormControl>
    )
}