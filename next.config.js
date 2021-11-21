/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ebooks/design-engineering-handbook',
        permanent: true,
      },
    ]
  },
}
