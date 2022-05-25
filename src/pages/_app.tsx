import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil'

import { googleTagManagerId } from '@/utils/gtm'
import GoogleTagManager, { GoogleTagManagerId } from '@/components/GoogleTagManager'

import Footer from '@/components/organisms/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GoogleTagManager
        googleTagManagerId={googleTagManagerId as GoogleTagManagerId}
      />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  );
}

export default MyApp;
