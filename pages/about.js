import Head from '@/components/head'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'

const Home = () => (
  <Page>
    <Head>
      <title>About | Harris Jose</title>
    </Head>

    <Header />

    <main className="container max-w-screen-md mx-auto mb-16 text-lg leading-relaxed">
      <div className="mb-8 mt-12 md:mt-24">
        <h1 className="text-5xl font-semibold">About Me</h1>
      </div>
      <p className="mt-6">
        Hey, I'm Harris. I live in Chennai, India and work as a software
        engineer at{' '}
        <a
          className="text-special"
          href="https://facilio.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="Open facilio.com in a new tab"
        >
          @FacilioInc
        </a>
        , where we build apps for facility management and remote operations. I
        mostly work with JavaScript, building infrastructure and tooling for our
        front-end team.
      </p>
      <p className="mt-6">
        Before Facilio, I used to work at{' '}
        <a
          className="text-link"
          href="https://zoho.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="Open zoho.com in a new tab"
        >
          @zoho
        </a>{' '}
        on their{' '}
        <a
          className="link"
          href="https://www.zoho.com/financeplus/"
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="Open zoho.com in a new tab"
        >
          Finance Suite of Products.
        </a>{' '}
        I was one of the primary developers for Zoho Checkout, a service that
        helps non-profits and small businesses accept payments easily.
      </p>
      <p className="mt-6">
        You can get in touch with me on{' '}
        <a
          className="text-link"
          href="https://twitter.com/harrispjose"
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="Open twitter profile"
        >
          twitter
        </a>{' '}
        or via{' '}
        <a
          className="text-link"
          href="mailto:harrisjose@outlook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="Open email"
        >
          email.
        </a>
        {/* If you’re looking for my resume, you can find it{' '}
        <a
          className="link"
          href=""
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="Download resume"
        >
          here
        </a>
        . */}
      </p>
    </main>

    <Footer />
  </Page>
)

export default Home
