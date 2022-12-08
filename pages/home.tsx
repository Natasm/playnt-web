import { useEffect } from 'react'
import { Backdrop, CircularProgress } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { useSelector } from 'react-redux';
import { ContextState } from '../redux/state/context';
import AppBarMain from '../sections/home/appBar';
import Background from '../sections/home/background';
import TrendingList from '../sections/home/trendingList';
import { authOptions } from './api/auth/[...nextauth]';

import { hasCookie, getCookie } from 'cookies-next'
import jwt_decode from 'jwt-decode'
import { JwtDecodeUserToken } from '../interfaces/jwt';
import { useDispatch } from 'react-redux';
import { resetPlayerReducer, setUserIdReducer } from '../redux/actions';
import ContinueWatching from '../sections/home/continue-watching';
import FeaturedDescription from '../sections/home/featured-description';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (session && hasCookie('user-token', { req: context.req })) {
    try {
      var jwt_decoded: JwtDecodeUserToken = jwt_decode(getCookie('user-token', { req: context.req })?.toString() || "")

      if (jwt_decoded?.id) {
        return {
          props: {
            userId: jwt_decoded.id
          }
        }
      }
    } catch (e) { }
  }

  return {
    redirect: {
      destination: '/auth/signIn',
      permanent: false,
    },
  }
}

interface HomeProps {
  userId: number
}

const HomePage: NextPage<HomeProps> = (props) => {

  const contextRedux: ContextState = useSelector((state: any) => state.context)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUserIdReducer(Number(props.userId)))

    dispatch(resetPlayerReducer())
  }, [])

  return (
    <>
      <Head>
        <title>Playnt</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <Background url="https://www.itl.cat/pngfile/big/22-226927_interstellar-movie.jpg">

        <AppBarMain />

        <div style={{ paddingLeft: 20, paddingTop: 200, paddingBottom: 100 }}>
          <FeaturedDescription />
        </div>

        <div>
          <TrendingList />
          <ContinueWatching userId={props.userId} />
        </div>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={contextRedux.loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

      </Background>
    </>
  );

}

export default HomePage