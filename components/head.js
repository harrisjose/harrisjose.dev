import Head from 'next/head'

const HeadWrapper = ({ children }) => (
  <Head>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <script
      dangerouslySetInnerHTML={{
        __html: `
            document.documentElement.setAttribute('data-theme', 'dark')
        `,
      }}
    ></script>
    {children}
  </Head>
)

export default HeadWrapper
