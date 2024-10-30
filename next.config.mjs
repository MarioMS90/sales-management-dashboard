/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'next-auth',
    '@auth/core',
    '@panva/hkdf',
    'jose',
    'oauth4webapi',
    'preact',
    'preact-render-to-string',
  ],
};

export default nextConfig;
