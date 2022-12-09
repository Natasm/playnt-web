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
                backgroundPosition: 'center center',
                backgroundSize: '40em 60em',
                backgroundRepeat: 'no-repeat',
                backgroundImage:
                    `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)),` +
                    `linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),` +
                    `url(${props.url})`,
                position: 'fixed',
                overflowY: 'scroll'
            }}
            color='black'
        >

            {props.children}
        </Box>
    )
}