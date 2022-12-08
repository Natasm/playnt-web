import { useTheme } from "@material-ui/core";
import { AppBar, Button, Typography, Box, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import { setRouteActionTriggeredReducer } from "../../redux/actions";
import { useAppDispatch } from "../../redux/store";

export default function AppBarSimple() {

    const dispatch = useAppDispatch()

    const router = useRouter()

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

                        <Button sx={{ color: 'white' }} onClick={
                            () => {
                                dispatch(setRouteActionTriggeredReducer("POP"))
                                router.back()
                            }
                        }>
                            Voltar
                        </Button>
                    </Box>

                </Toolbar>
            </AppBar>
        </Box>
    )
}