/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  images: {
    domains: ['fonts.bunny.net'],
  },
}

module.exports = nextConfig
