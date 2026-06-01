/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.mercedes-benz.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mercedes-benz.be',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.mercedes-benz.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
