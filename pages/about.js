import Head from 'next/head'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'

const Home = () => (
  <Page>
    <Head>
      <title>About | Harris Jose</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <main className="container max-w-screen-md mx-auto mb-16 leading-relaxed">
      <div className="mt-24">
        <h1 className="text-5xl font-semibold">About Me</h1>
      </div>
      <p className="mt-3">
        Hey, I'm Harris. I live in Chennai, India and work as a software engineer at{' '}
        <a
          className="text-special"
          href="https://facilio.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="Open company website in a new tab"
        >
          @FacilioInc
        </a>
        , where we build apps for facility management and remote operations. I mostly work with JavaScript, building
        infrastructure and tooling for our client teams.
      </p>
      <p className="mt-3">
        Before Facilio, I used to work at{' '}
        <a
          className="text-special"
          href="https://zoho.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="Open company website in a new tab"
        >
          @zoho
        </a>{' '}
        on their Finance Suite of Products. I was one of the primary developers for Zoho Checkout, a service that helps
        non-profits and small businesses accept payments easily.
      </p>
      <p className="mt-3">
        You can get in touch with me on twitter or via email. If you’re looking for my resume, you can find it here.
      </p>
    </main>

    <Footer />
  </Page>
)

export default Home
