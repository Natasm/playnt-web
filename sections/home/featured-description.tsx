import { Container } from "@material-ui/core";

export default function FeaturedDescription() {
    return (
        <Container>
            <div
                style={{
                    fontWeight: 100,
                    fontSize: 15,
                    letterSpacing: '.2rem',
                    color: '#D5D3D3',
                    textDecoration: 'none',
                }}
            >
                Ficção científica | Aventura | Drama
            </div>

            <div
                style={{
                    fontWeight: 700,
                    fontSize: 50,
                    letterSpacing: '.2rem',
                    color: '#D5D3D3',
                    textDecoration: 'none',
                }}
            >
                Interestellar
            </div>
        </Container>
    )
}