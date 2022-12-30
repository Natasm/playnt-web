import { Backdrop, CircularProgress } from "@mui/material"
import { useSelector } from "react-redux"
import { ContextState } from "../../../redux/state/context"
import AppBarSimple from "./appBarSimple"
import Background from "./background"
import FormLogin from "./form"

export default function SignIn() {

    const contextRedux: ContextState = useSelector((state: any) => state.context)

    return (
        <Background url="https://www.itl.cat/pngfile/big/22-226927_interstellar-movie.jpg">

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
