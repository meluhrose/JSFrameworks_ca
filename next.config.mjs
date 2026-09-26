const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/JSFrameworks_ca' : '',
  assetPrefix: isProd ? '/JSFrameworks_ca/' : '',
};

export default nextConfig;
