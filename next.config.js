/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.giphy.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/search",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
