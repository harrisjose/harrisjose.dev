import { DefaultSeo } from 'next-seo'
import SEOConfig from '../seo.config'

import '../styles/globals.scss'
import '../styles/article.scss'
import '../styles/highlight-dark.scss'
import '../styles/highlight-light.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEOConfig}></DefaultSeo>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
