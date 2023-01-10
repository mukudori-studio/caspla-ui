import { useEffect, useState } from 'react'
import Router from 'next/router'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { googleTagManagerId } from '@/utils/gtm'
import GoogleTagManager, { GoogleTagManagerId } from '@/components/GoogleTagManager'
import '@/styles/globals.scss'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'

function MyApp({ Component, pageProps }: AppProps) {

  const [isShowMenu, setShowMenu] = useState(true)
  const [isTop, setTop] = useState(false)

  useEffect(() => {
    if( Router.pathname === "/top" ) {
      setShowMenu(false)
      setTop(true)
    } else {
      setTop(false)
      setShowMenu(true)
    }
 })

  return (
    <RecoilRoot>
      <GoogleTagManager
        googleTagManagerId={googleTagManagerId as GoogleTagManagerId}
      />
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K3M3PBR" height="0" width="0" style={{"display":"none","visibility":"hidden"}}></iframe>
      </noscript>
      <Header showMenu={isShowMenu} isTop={isTop}/>
      <div style={{ minHeight: 'calc(100% - 181px)' }} className={'wrapper'} id="root">
        <ToastContainer position="bottom-left" />
        <Component {...pageProps} />
      </div>
      <Footer />
    </RecoilRoot>
  );
}

export default MyApp;
