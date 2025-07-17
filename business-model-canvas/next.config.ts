/** @type {import('next').NextConfig} */


const nextConfig = {
  // For GitHub Pages deployment
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  basePath: process.env.NODE_ENV === 'production' ? '/business-model-canvas' : '',
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
