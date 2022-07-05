import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import { googleTagManagerId } from '@/utils/gtm'
import GoogleTagManager, { GoogleTagManagerId } from '@/components/GoogleTagManager'

import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <RecoilRoot>
      <GoogleTagManager
        googleTagManagerId={googleTagManagerId as GoogleTagManagerId}
      />
      <Header />
      <div style={{ minHeight: 'calc(100vh - 191px)' }} className={'wrapper'} id="root">
        <ToastContainer position="bottom-left" />
        <Component {...pageProps} />
      </div>
      <Footer />
    </RecoilRoot>
  );
}

export default MyApp;
