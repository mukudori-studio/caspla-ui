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
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}

export default CommonMeta
