import { useState, useEffect } from 'react'
import { Button, Grid, TextField, Typography } from "@material-ui/core"
import { signIn } from "next-auth/react";
import { useAppDispatch } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { setLoadingGlobal } from '../../../redux/actions';

export function FormLogin() {

    const dispatch = useAppDispatch()
    const router = useRouter()

    const authState = useSelector((state: any) => state.auth)

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    useEffect(() => {
        if (authState.token) router.push('/signin')
    }, [authState])

    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    };

    const submit = async () => {
        dispatch(setLoadingGlobal(true))
        
        await signIn('signIn', {
            login,
            password,
            callbackUrl: '/home'
        })

        //dispatch(setLoadingGlobal(false))
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh', padding: 10 }}
        >
            <Grid item xs={12} style={{ 
                backgroundColor: 'white', 
                padding: 20,
                borderRadius: 20,
                boxShadow: "1px 1px 50px #111"
            }}>
                <Typography gutterBottom variant="h5">
                    Acesso
                </Typography>
                <form>
                    <TextField
                        style={{ paddingBottom: 20 }}
                        placeholder="Login"
                        label="Login"
                        variant="outlined"
                        fullWidth
                        required
                        value={login}
                        onChange={handleLoginChange}
                    />
                    <TextField
                        style={{ paddingBottom: 20 }}
                        placeholder="Senha"
                        label="Senha"
                        variant="outlined"
                        fullWidth
                        required
                        type='password'
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <Button
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        onClick={submit}
                    >
                        Entrar
                    </Button>
                </form>
            </Grid>
        </Grid >
    )
}