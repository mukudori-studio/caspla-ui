import '@/styles/globals.scss';
import { isMobile } from "react-device-detect"
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil'

import { googleTagManagerId } from '@/utils/gtm'
import GoogleTagManager, { GoogleTagManagerId } from '@/components/GoogleTagManager'

import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'

function MyApp({ Component, pageProps }: AppProps) {

  const calcMinHeight = isMobile ? (window.innerHeight - 50 - 240) : 'calc(100vh - 80px - 200px)'

  return (
    <RecoilRoot>
      <GoogleTagManager
        googleTagManagerId={googleTagManagerId as GoogleTagManagerId}
      />
      <Header />
      <div style={{ minHeight: calcMinHeight }} className={'wrapper'}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </RecoilRoot>
  );
}

export default MyApp;
