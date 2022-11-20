import { Typography, Box } from "@mui/material";

export default function FeaturedDescription() {
    return (
        <Box  sx={{ flexGrow: 1 }}>
            <p
                style={{
                    fontWeight: 100,
                    fontSize: 15,
                    letterSpacing: '.2rem',
                    color: '#D5D3D3',
                    textDecoration: 'none',
                }}
            >
                Ficção científica | Aventura | Drama
            </p>

            <p
                style={{
                    fontWeight: 700,
                    fontSize: 30,
                    letterSpacing: '.2rem',
                    color: '#D5D3D3',
                    textDecoration: 'none',
                }}
            >
                Interestellar
            </p>

            <p
                style={{
                    fontWeight: 100,
                    maxWidth: '30vw',
                    letterSpacing: '.1rem',
                    fontSize: 18,
                    color: '#D5D3D3',
                    textDecoration: 'none',
                }}
            >
                Um dos melhores filmes da história do cinema. Assista aqui e agora!
            </p>
        </Box>
    )
}