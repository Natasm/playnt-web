import { Typography, Box } from "@mui/material";

export default function FeaturedDescription() {
    return (
        <Box sx={{ flexGrow: 1 }}>
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
                    maxWidth: '50vw',
                    letterSpacing: '.05rem',
                    fontSize: 20,
                    color: '#D5D3D3',
                    textDecoration: 'none',
                }}
            >
                
            </p>
        </Box>
    )
}