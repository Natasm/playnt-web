import { AppBar, Button, Typography, Box, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { setLoadingReducer, setRouteActionTriggeredReducer } from "../../redux/actions";
import { useAppDispatch } from "../../redux/store";
import { DialogButtonCache } from "./dialog/cache";

export default function AppBarMain() {

    const dispatch = useAppDispatch()

    const router = useRouter()

    useEffect(() => {
        return () => {
            dispatch(setLoadingReducer(false))
        }
    },[])

    const navigateToMoviePage = () => {
        dispatch(setRouteActionTriggeredReducer("PUSH"))
        
        dispatch(setLoadingReducer(true))
        
        router.push('catalog')
        
    }

    const navigateToDownloadedPage = () => {
        dispatch(setLoadingReducer(true))

        router.push('downloaded')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    padding: 2,
                    backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
                    backgroundColor: 'transparent'
                }}
            >
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: { xs: 'table-row', md: 'flex' } }}>
                        <Typography
                            variant="h4"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            PLAYNT
                        </Typography>

                        <Button sx={{ color: 'white' }} onClick={navigateToMoviePage}>Filmes e Séries</Button>
                    </Box>

                    <div>
                        {/*<Button sx={{ color: 'white' }} onClick={navigateToDownloadedPage}>Baixados</Button>*/}
                        <DialogButtonCache />
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}