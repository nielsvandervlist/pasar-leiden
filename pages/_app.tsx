import { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import '../styles/index.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/global.scss'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <Analytics />
  </>
}

export default MyApp
