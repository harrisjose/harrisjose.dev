const title = 'Harris Jose | Front-end developer & JavaScript enthusiast'

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
        url: 'https://harrisjose.dev/static/images/opengraph.jpg',
        alt: title,
        width: 1280,
        height: 720,
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
