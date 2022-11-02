import { Backdrop, CircularProgress } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { useSelector } from "react-redux";
import AppBarMovie from "../../sections/movie/appBar";
import Background from "../../sections/movie/background";
import MovieList from "../../sections/movie/list";
import { authOptions } from "../api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (session) {
        return {
            props: {}
        }
    }

    return {
        redirect: {
            destination: '/auth/signin',
            permanent: false,
        },
    }
}

const Movie: NextPage = () => {

    const loadingGlobal = useSelector((state: any) => state.loadingGlobal)

    return (
        <Background url="https://www.itl.cat/pngfile/big/22-226927_interstellar-movie.jpg">
            <AppBarMovie />

            <div style={{ paddingTop: 100 }}>
                <MovieList />
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingGlobal.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

        </Background>
    )
}

export default Movie