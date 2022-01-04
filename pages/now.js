import React from 'react'
import Link from 'next/link'
import Page from '@/components/page'
import Head from '@/components/head'
import Now from '@/components/now'
import Bio from '@/components/bio'

const Home = ({ posts }) => {
  return (
    <Page>
      <Head></Head>

      <main className="container max-w-screen-sm mx-auto mb-16">
        <Bio></Bio>
        <Now />

        <section className="mt-16">
          <Link href={'/'}>
            <div className="text-dim underline italic cursor-pointer hover:text-light">
              go home →
            </div>
          </Link>
        </section>
      </main>
    </Page>
  )
}

export default Home
