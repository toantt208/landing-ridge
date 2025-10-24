/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'emitter': 'emitter-component',
    }
    return config
  },
}

module.exports = nextConfig
