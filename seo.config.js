const title = 'Harris Jose | Full stack JavaScript Developer'

const SEO = {
  title,
  canonical: 'https://harrisjose.dev',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://harrisjose.dev',
    title,
    images: [
      {
        url: 'https://harrisjose.dev/images/opengraph.png',
        alt: title,
        width: 1024,
        height: 1024,
      },
    ],
  },
  twitter: {
    handle: '@harrispjose',
    site: '@harrispjose',
    cardType: 'summary_large_image',
  },
}

export default SEO
