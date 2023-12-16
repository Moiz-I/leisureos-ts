/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.tvmaze.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
