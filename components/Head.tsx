import React from 'react'
import NextHead from 'next/head'
import { SITE_URL } from 'lib/constants'
import { useRouter } from 'next/router'

type Props = {
  title: string
  description: string
  type?: string
  image?: string
}

const Head = ({ title, description, type = 'website', image }: Props) => {
  const fullPageTitle = `${title} | InDebted`
  const router = useRouter()

  return (
    <NextHead>
      <title>{fullPageTitle}</title>

      <link rel="icon" href="/favicon.ico" />

      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <link rel="canonical" href={`${SITE_URL}${router.asPath}`} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Edgar López" />
      <meta property="og:title" content={fullPageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${SITE_URL}${router.asPath}`} />
      <meta property="og:image" content={image} />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />

      <meta name="twitter:title" content={fullPageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@indebtedhq" />
    </NextHead>
  )
}

export default Head
