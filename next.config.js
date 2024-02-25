/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sponsorship-images.s3.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;

