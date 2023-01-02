import { Box } from "@mui/material";
import { TMDBMoviePopularityDto } from "../../services/catalog/interface/response.interface";

interface Props {
    data: TMDBMoviePopularityDto
}

export default function FeaturedDescription(props: Props) {

    return (
        <Box sx={{ paddingLeft: 5 }}>
            <div
                style={{
                    width: '50%',
                    fontWeight: 700,
                    fontSize: 40,
                    letterSpacing: '.1rem',
                    color: '#D5D3D3',
                    textDecoration: 'none',
                    paddingBottom: 20
                }}
            >
                {props.data?.title || ''}
            </div>

            <div
                style={{
                    width: '50%',
                    fontWeight: 100,
                    fontSize: 20,
                    color: '#D5D3D3',
                    textDecoration: 'none',
                }}
            >
                {props.data?.overview || ''}
            </div>
        </Box>
    )
}