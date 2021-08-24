const title = 'Harris Jose'
const description =
  'Senior Software Engineer at Facilio | React, Node.js, JavaScript'
const SEO = {
  title,
  description,
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
