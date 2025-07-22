/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for nginx deployment
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Remove exportPathMap as it's not compatible with App Router
  // App Router uses generateStaticParams() in page components instead
  
  // Enable source maps in development
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'eval-source-map';
    }
    return config;
  },
};

module.exports = nextConfig;