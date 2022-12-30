import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { ContextState } from '../../redux/state/context';
import Background from './background';
import AppBarCustom from './appBar';
import CatalogList from './list';

interface CatalogProps {
    userId: number
}

export default function Catalog(props: CatalogProps) {

    const contextRedux: ContextState = useSelector((state: any) => state.context)

    return (
        <>
            <Background url="https://www.itl.cat/pngfile/big/22-226927_interstellar-movie.jpg">

                <AppBarCustom />

                <div style={{ paddingTop: 100 }}>
                    <CatalogList />
                </div>

            </Background>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={contextRedux.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}