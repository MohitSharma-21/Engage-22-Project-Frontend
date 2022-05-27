// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }
// module.exports = nextConfig

// reactStrictMode true means useEffect called 2 times
// reactStrictMode false means useEffect called 1 times

module.exports = {
  reactStrictMode: true,
  compress: true,
  // reactStrictMode: false,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};