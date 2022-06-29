import '@/styles/globals.scss';
import { isMobile } from "react-device-detect"
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil'

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
        <Component {...pageProps} />
      </div>
      <Footer />
    </RecoilRoot>
  );
}

export default MyApp;
