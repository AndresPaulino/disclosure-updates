/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_SERVER_URL: 'http://localhost:3001',
  },
};

module.exports = nextConfig;