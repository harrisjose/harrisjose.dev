import Head from 'next/head'

const Meta = ({ children }) => (
  <Head>
    {children}
    <link rel="icon" href="/favicon.ico" />
    <script
      dangerouslySetInnerHTML={{
        __html: `
          var pref1 = localStorage.getItem('hpj-theme');
          var pref2 = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
          if (pref1) {
            document.documentElement.setAttribute('data-theme', pref1)
          } else {
            document.documentElement.setAttribute('data-theme', pref2)
          }
        `,
      }}
    ></script>
  </Head>
)

export default Meta
