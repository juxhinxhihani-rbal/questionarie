/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for nginx deployment
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable server-side features for static export
  experimental: {
    appDir: true,
  },
  // Configure export paths
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/questionnaire/[ssn]': { page: '/questionnaire/[ssn]' },
    };
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