import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack']
      }
    )

    fileLoaderRule.exclude = /\.svg$/i
    return config
  },
  images: {
    domains: ['img.buzzfeed.com', 's3.amazonaws.com', 'video-api-prod.assets'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.buzzfeed.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.eatthismuch.com',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
