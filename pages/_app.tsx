
import { Provider } from "react-redux"
import { AppProps } from "next/app"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

import store from "../redux/store"

import './app.css'
import '../styles/react-horizontal-scrolling-menu-custom.css'
import '../styles/videojs.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session}>) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  )
}

export default MyApp
