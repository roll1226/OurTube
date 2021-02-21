import React from "react"
import Head from "next/head"

interface Props {
  title: string
  description: string
  keyword: string
  url: string
  top: boolean
}

const HeadAtoms = ({
  title,
  description,
  keyword,
  url,
  top,
}: Props): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keyword} />
      <meta property="og:type" content={top ? "website" : "article"} />
      <meta property="og:url" content={url} />
      <meta
        property="og:image"
        content="https://firebasestorage.googleapis.com/v0/b/our-tubes.appspot.com/o/ogp%2Fogp.jpg?alt=media&token=08ab64b1-4893-4594-a661-b61abf39c107"
      />
      <meta property="og:site_name" content="OurTube" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@our_tube" />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={url} />
    </Head>
  )
}

export default HeadAtoms
