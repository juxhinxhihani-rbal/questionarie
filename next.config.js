/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for nginx deployment
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Enable source maps in development
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'eval-source-map';
    }
    return config;
  },
};

module.exports = nextConfig;
