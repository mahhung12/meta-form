// import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    // includePaths: [path.join('/', 'styles')],
  },
  images: {
    disableStaticImages: true,
    domains: ['meta.supportfanpage.ink'],
    deviceSizes: [375, 720, 1080],
    imageSizes: [300, 600, 900],
  },
};

module.exports = nextConfig;
