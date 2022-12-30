import { useEffect } from 'react'
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from './api/auth/[...nextauth]';

import { hasCookie, getCookie, deleteCookie } from 'cookies-next'
import jwt_decode from 'jwt-decode'
import { JwtDecodeUserToken } from '../interfaces/jwt';
import { resetPlayerReducer, setUserIdReducer } from '../redux/actions';

import Head from 'next/head';
import Home from '../sections/home';

import { findUserByCustomerId } from '../services/stream/user';
import { useAppDispatch } from '../redux/store';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (session && hasCookie('user-token', { req: context.req })) {

    try {

      var jwt_decoded: JwtDecodeUserToken = jwt_decode(getCookie('user-token', { req: context.req })?.toString() || "")

      if (jwt_decoded?.customerId) {

        const user = await findUserByCustomerId(Number(jwt_decoded?.customerId))

        return {
          props: {
            userId: user.id,
            customerId: user.customerId
          }
        }

      }
    } catch (e) {
      deleteCookie('user-token',{ req: context.req, res: context.res })
    }
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
  customerId: number
}

const HomePage: NextPage<HomeProps> = (props) => {

  const dispatch = useAppDispatch()

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

      <Home userId={props.userId} />
    </>
  );

}

export default HomePage