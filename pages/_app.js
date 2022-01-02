import { DefaultSeo } from 'next-seo'
import SEOConfig from '../seo.config'
import '../styles/index.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEOConfig}></DefaultSeo>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
