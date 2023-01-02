import { Backdrop, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ContextState } from "../../../redux/state/context"
import { getMoviesByPopularity } from "../../../services/catalog/titles"
import AppBarSimple from "./appBarSimple"
import Background from "./background"
import FormLogin from "./form"

export default function SignIn() {

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
        <Background url={url}>

            <AppBarSimple />

            <FormLogin />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={contextRedux.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Background>
    )
}
