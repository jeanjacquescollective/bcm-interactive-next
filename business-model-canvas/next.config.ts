/** @type {import('next').NextConfig} */


const nextConfig = {
  // For GitHub Pages deployment
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  basePath: process.env.NODE_ENV === 'production' ? 'https://bcm-interactive-next.vercel.app/' : '',
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
