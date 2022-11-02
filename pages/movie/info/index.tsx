import { Backdrop, CircularProgress } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AppBarMovieSimple from "../../../sections/movie/appBarSimple";
import Background from "../../../sections/movie/background";
import InfoMovieMediaList from "../../../sections/movie/info/mediaList";
import { authOptions } from "../../api/auth/[...nextauth]";

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

const InfoMovie: NextPage = () => {

    const loadingGlobal = useSelector((state: any) => state.loadingGlobal)

    useEffect(() => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }, [])

    return (
        <Background url="https://www.itl.cat/pngfile/big/22-226927_interstellar-movie.jpg">
            <AppBarMovieSimple />

            <div style={{ paddingTop: 100 }}>
                <InfoMovieMediaList />
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

export default InfoMovie