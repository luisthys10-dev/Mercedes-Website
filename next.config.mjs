/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.mercedes-benz.be',
        pathname: '/content/dam/**',
      },
      {
        protocol: 'https',
        hostname: 'media.mercedes-benz.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.mercedes-benz.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
