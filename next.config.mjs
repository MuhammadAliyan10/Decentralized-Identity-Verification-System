/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
    });
    return config;
  },
};

export default nextConfig;
