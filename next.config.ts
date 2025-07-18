/** @type {import('next').NextConfig} */


const nextConfig = {
  // For GitHub Pages deployment
  output: process.env.NODE_ENV === 'production' ? undefined : undefined,
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',

  trailingSlash: true,
  // For static exports
  images: {
    unoptimized: true,
  },
  // i18n: {
  //   locales: ['en-US', 'nl'],   // Add your supported locales here
  //   defaultLocale: 'en',
  // },
  
}

module.exports = nextConfig
