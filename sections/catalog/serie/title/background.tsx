import { Box } from "@mui/material";

interface BackgroundProps {
    url: string,
    children?: React.ReactNode;
}

export default function Background(props: BackgroundProps) {
    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                backgroundPosition: 'center top',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundImage:
                    `linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 1)),` +
                    `url(${props.url})`,
                position: 'fixed',
                overflowY: 'scroll'
            }}
            color='black'
        >
            { props.children }
        </Box>
    )
}