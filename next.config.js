/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  eslint:{
    ignoreDuringBuilds: true,
  }
};

module.exports = config;
