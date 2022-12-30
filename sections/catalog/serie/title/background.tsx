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
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundImage:
                    `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),` +
                    `linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)),` +
                    `url(${props.url})`
            }}
            color='black'
        >
            {props.children}
        </Box>
    )
}