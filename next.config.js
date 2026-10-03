/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  images: {
    deviceSizes: [640, 828, 1200, 1920, 2560, 3500],
    imageSizes: [64, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 2678400,
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sponsorship-images.s3.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
