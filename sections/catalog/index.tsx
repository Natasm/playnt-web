import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { ContextState } from '../../redux/state/context';
import Background from './background';
import AppBarCustom from './appBar';
import CatalogList from './list';
import { useEffect, useState } from "react";
import { getMoviesByPopularity } from "../../services/catalog/titles";

interface CatalogProps {
    userId: number
}

export default function Catalog(props: CatalogProps) {

    const contextRedux: ContextState = useSelector((state: any) => state.context)

    const [url, setUrl] = useState("");

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const response = await getMoviesByPopularity()

            if (response) {
                setUrl(response.results[0]?.backdrop_path)
            }
        } catch (e) {

        }
    }

    return (
        <>
            <Background url={url}>

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