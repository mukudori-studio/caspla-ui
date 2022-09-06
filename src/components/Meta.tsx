import Head from 'next/head'

type MetaProps = {
  title: string
  description?: string
}

const CommonMeta = ({
  title,
  description = "dummy text"
}: MetaProps) => {

  return (
    <Head>
      <title>{title} | Caspla(キャスプラ)</title>
      { description && <meta property="description" content={description} /> }
      <meta property="og:title" content={`${title} | Caspla(キャスプラ)`} />
      { description && <meta property="og:description" content={description} /> }
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/ogp.png`} />
      <meta name="twitter:card" content="summary_large_image"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
    </Head>
  )
}

export default CommonMeta
