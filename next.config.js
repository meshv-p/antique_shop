/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "tailwindui.com",
      "localhost",
      "strapi-meshv.herokuapp.com",
      "upload.wikimedia.org",
    ],
  },
};

module.exports = nextConfig;
